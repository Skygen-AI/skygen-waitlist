use tauri::{Manager, WebviewWindowBuilder, Listener};
use std::sync::Mutex;
use std::process::{Child, ChildStdin, Command};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
#[cfg(target_os = "macos")]
use cocoa::appkit::NSWindowCollectionBehavior;
#[cfg(target_os = "macos")]
use cocoa::base::{id, NO};
#[cfg(target_os = "macos")]
use objc::runtime::YES;
#[cfg(target_os = "macos")]
use objc::{msg_send, sel, sel_impl};

struct OverlayState {
    visible: bool,
    outline_process: Option<Child>,
    outline_stdin: Option<ChildStdin>,
}

#[derive(Debug, Serialize, Deserialize)]
struct AuthResponse {
    success: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    data: Option<serde_json::Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct StatusResponse {
    authenticated: bool,
    device_enrolled: bool,
    connected: bool,
    #[serde(skip_serializing_if = "Option::is_none")]
    device_id: Option<String>,
    platform: String,
    desktop_env_available: bool,
}

impl Default for OverlayState {
    fn default() -> Self {
        Self { visible: false, outline_process: None, outline_stdin: None }
    }
}

#[tauri::command]
fn show_overlay(app: tauri::AppHandle, state: tauri::State<'_, Mutex<OverlayState>>) -> Result<(), String> {
    let mut overlay_state = state.lock().unwrap();
    
    if overlay_state.visible {
        println!("Оверлей уже показан");
        return Ok(());
    }

    println!("Начинаем показ оверлея...");
    
    // Добавляем задержку перед появлением оверлея  
    std::thread::sleep(std::time::Duration::from_millis(500));

    // Получаем размеры экрана
    let monitors = app.primary_monitor().map_err(|e| e.to_string())?;
    let monitor = monitors.ok_or("Не удалось получить информацию о мониторе")?;
    let scale_factor = monitor.scale_factor();
    let screen_size_physical = monitor.size();
    let screen_size = screen_size_physical.to_logical::<f64>(scale_factor);
    
    // Размеры и позиция оверлея (панель по центру экрана)
    let overlay_width = 720;
    let overlay_height = 120;
    // Центр экрана
    let x = (screen_size.width as i32 / 2) - (overlay_width as i32 / 2);
    let y = (screen_size.height as i32 / 2) - (overlay_height as i32 / 2);
    
    println!("Размер экрана: {}x{}", screen_size.width, screen_size.height);
    println!("Размер оверлея: {}x{}", overlay_width, overlay_height);
    println!("Центр экрана: x={}, y={}", screen_size.width / 2.0, screen_size.height / 2.0);
    println!("Позиция оверлея: x={}, y={}", x, y);
    println!("Должно быть по центру: x={}, y={}", 
             ((screen_size.width / 2.0) - (overlay_width as f64 / 2.0)) as i32,
             ((screen_size.height / 2.0) - (overlay_height as f64 / 2.0)) as i32);

    // Основная панель-оверлей
    let overlay_window = WebviewWindowBuilder::new(
        &app,
        "overlay",
        tauri::WebviewUrl::App("overlay".into())
    )
    .title("Overlay")
    .inner_size(overlay_width as f64, overlay_height as f64)
    .position(x as f64, y as f64)
    .resizable(false)
    .decorations(false)
    .always_on_top(true)
    .skip_taskbar(true)
    .transparent(true)
    .visible(true)
    .build()
    .map_err(|e| e.to_string())?;

    // Принудительно показываем окно
    overlay_window.show().map_err(|e| e.to_string())?;
    // Центрируем после показа (на случай неверной логической/физической конверсии)
    let _ = overlay_window.set_position(tauri::LogicalPosition::new(
        (screen_size.width - overlay_width as f64) / 2.0,
        (screen_size.height - overlay_height as f64) / 2.0,
    ));
    
    println!("Окно оверлея создано и показано в позиции x={}, y={}", x, y);

    // macOS: повысим уровень окна, включим показ во всех пространствах и поверх fullscreen (на главном потоке)
    #[cfg(target_os = "macos")]
    {
        let overlay_clone = overlay_window.clone();
        let app_handle = app.clone();
        let _ = app_handle.run_on_main_thread(move || unsafe {
            if let Ok(ns_win_ptr) = overlay_clone.ns_window() {
                let ns_win: id = ns_win_ptr as id;
                let level: i32 = 101; // уровень панели
                let _: () = msg_send![ns_win, setLevel: level];
                let behavior = NSWindowCollectionBehavior::NSWindowCollectionBehaviorCanJoinAllSpaces
                    | NSWindowCollectionBehavior::NSWindowCollectionBehaviorFullScreenAuxiliary
                    | NSWindowCollectionBehavior::NSWindowCollectionBehaviorTransient;
                let _: () = msg_send![ns_win, setCollectionBehavior: behavior];
                let _: () = msg_send![ns_win, setOpaque: NO];
                let _: () = msg_send![ns_win, setHasShadow: YES];
            }
        });
    }
    
    // Не перехватываем фокус у активного приложения (если есть главное окно — вернём фокус)
    if let Some(main_window) = app.get_webview_window("main") {
        let _ = main_window.set_focus();
    }

    overlay_state.visible = true;
    println!("Состояние оверлея установлено как видимый");
    
    // Убеждаемся, что переменная используется и не удаляется
    std::mem::forget(overlay_window);
    
    Ok(())
}

#[tauri::command]
fn hide_overlay(app: tauri::AppHandle, state: tauri::State<'_, Mutex<OverlayState>>) -> Result<(), String> {
    let mut overlay_state = state.lock().unwrap();
    
    if !overlay_state.visible {
        return Ok(());
    }

    if let Some(overlay_window) = app.get_webview_window("overlay") {
        overlay_window.close().map_err(|e| e.to_string())?;
    }
    if let Some(dim_window) = app.get_webview_window("overlay_dim") {
        dim_window.close().map_err(|e| e.to_string())?;
    }

    overlay_state.visible = false;
    Ok(())
}

#[tauri::command]
fn show_dim(app: tauri::AppHandle) -> Result<(), String> {
    // Create or show dim window
    if app.get_webview_window("overlay_dim").is_none() {
        let monitors = app.primary_monitor().map_err(|e| e.to_string())?;
        let monitor = monitors.ok_or("Не удалось получить информацию о мониторе")?;
        let scale = monitor.scale_factor();
        let logical = monitor.size().to_logical::<f64>(scale);
        let dim = WebviewWindowBuilder::new(
            &app,
            "overlay_dim",
            tauri::WebviewUrl::App("overlay/background".into())
        )
        .title("Dim")
        .inner_size(logical.width, logical.height)
        .position(0.0, 0.0)
        .resizable(false)
        .decorations(false)
        .always_on_top(true)
        .skip_taskbar(true)
        .transparent(true)
        .visible(true)
        .build()
        .map_err(|e| e.to_string())?;

        // macOS: сделать окно диммера кликабельным насквозь и видимым во всех пространствах
        #[cfg(target_os = "macos")]
        {
            let app_handle = app.clone();
            let dim_clone = dim.clone();
            let _ = app_handle.run_on_main_thread(move || unsafe {
                if let Ok(ns_win_ptr) = dim_clone.ns_window() {
                    let ns_win: id = ns_win_ptr as id;
                    let level: i32 = 100; // ниже панели
                    let _: () = msg_send![ns_win, setLevel: level];
                    let behavior = NSWindowCollectionBehavior::NSWindowCollectionBehaviorCanJoinAllSpaces
                        | NSWindowCollectionBehavior::NSWindowCollectionBehaviorFullScreenAuxiliary
                        | NSWindowCollectionBehavior::NSWindowCollectionBehaviorTransient;
                    let _: () = msg_send![ns_win, setCollectionBehavior: behavior];
                    let _: () = msg_send![ns_win, setOpaque: NO];
                    let _: () = msg_send![ns_win, setIgnoresMouseEvents: YES];
                }
            });
        }
    } else if let Some(win) = app.get_webview_window("overlay_dim") {
        let _ = win.show();
        let _ = win.set_focus();
    }
    Ok(())
}

#[tauri::command]
fn hide_dim(app: tauri::AppHandle) -> Result<(), String> {
    if let Some(win) = app.get_webview_window("overlay_dim") {
        let _ = win.close();
    }
    Ok(())
}

#[tauri::command]
fn start_outline(_app: tauri::AppHandle, state: tauri::State<'_, Mutex<OverlayState>>, color: String, width: Option<u32>, blur: Option<u32>) -> Result<(), String> {
    #[cfg(not(target_os = "macos"))]
    {
        return Err("Outline доступен только на macOS".into());
    }

    #[cfg(target_os = "macos")]
    {
        use std::path::PathBuf;
        use std::process::{Command, Stdio};

        // Если уже запущен — сначала остановим
        {
            let mut s = state.lock().unwrap();
            if let Some(mut child) = s.outline_process.take() {
                let _ = child.kill();
            }
        }

        // 1) Явный путь через переменную окружения
        if let Ok(explicit) = std::env::var("OUTLINE_HELPER_PATH") {
            let mut cmd = Command::new(explicit);
            cmd.arg("--color").arg(&color);
            if let Some(w) = width { cmd.arg("--width").arg(w.to_string()); }
            if let Some(b) = blur { cmd.arg("--blur").arg(b.to_string()); }
            let mut child = cmd
                .stdin(Stdio::piped())
                .stdout(Stdio::null())
                .stderr(Stdio::null())
                .spawn()
                .map_err(|e| e.to_string())?;
            let mut s = state.lock().unwrap();
            s.outline_stdin = child.stdin.take();
            s.outline_process = Some(child);
            return Ok(())
        }

        // 2) Относительно рабочей директории (обычно src-tauri)
        let mut candidates: Vec<PathBuf> = Vec::new();
        if let Ok(cwd) = std::env::current_dir() {
            let mut p = cwd.clone();
            p.push("macos/OutlineHelper/OutlineHelper");
            candidates.push(p);
        }
        // 3) Относительно корня проекта (поднимаемся на два уровня из exe)
        if let Ok(exe) = std::env::current_exe() {
            if let Some(root) = exe.parent().and_then(|p| p.parent()).and_then(|p| p.parent()) {
                let mut p = root.to_path_buf();
                p.push("src-tauri/macos/OutlineHelper/OutlineHelper");
                candidates.push(p);
            }
        }

        let helper_path = candidates.into_iter().find(|p| p.exists())
            .ok_or_else(|| "Не найден OutlineHelper. Соберите через: bash skygen-ui/src-tauri/macos/build_outline_helper.sh или задайте OUTLINE_HELPER_PATH".to_string())?;

        let mut cmd = Command::new(helper_path);
        cmd.arg("--color").arg(&color);
        if let Some(w) = width { cmd.arg("--width").arg(w.to_string()); }
        if let Some(b) = blur { cmd.arg("--blur").arg(b.to_string()); }
        let mut child = cmd
            .stdin(Stdio::piped())
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .spawn()
            .map_err(|e| e.to_string())?;

        let mut s = state.lock().unwrap();
        s.outline_stdin = child.stdin.take();
        s.outline_process = Some(child);
        Ok(())
    }
}

#[tauri::command]
fn stop_outline(_app: tauri::AppHandle, state: tauri::State<'_, Mutex<OverlayState>>) -> Result<(), String> {
    let mut s = state.lock().unwrap();
    s.outline_stdin.take();
    if let Some(mut child) = s.outline_process.take() {
        let _ = child.kill();
        #[cfg(target_os = "macos")]
        {
            // На случай, если процесс ещё жив — добиваем pkill по имени
            let _ = std::process::Command::new("/usr/bin/pkill")
                .arg("-f")
                .arg("OutlineHelper")
                .status();
        }
    }
    Ok(())
}

#[tauri::command]
fn update_outline(_app: tauri::AppHandle, state: tauri::State<'_, Mutex<OverlayState>>, color: Option<String>, width: Option<u32>, blur: Option<u32>) -> Result<(), String> {
    let mut s = state.lock().unwrap();
    if let Some(stdin) = s.outline_stdin.as_mut() {
        let mut payload = serde_json::Map::new();
        if let Some(c) = color { payload.insert("color".into(), serde_json::Value::String(c)); }
        if let Some(w) = width { payload.insert("width".into(), serde_json::Value::Number(w.into())); }
        if let Some(b) = blur { payload.insert("blur".into(), serde_json::Value::Number(b.into())); }
        let msg = serde_json::Value::Object(payload).to_string() + "\n";
        use std::io::Write;
        stdin.write_all(msg.as_bytes()).map_err(|e| e.to_string())?;
        let _ = stdin.flush();
        Ok(())
    } else {
        Err("OutlineHelper не запущен".into())
    }
}

fn get_python_path() -> Result<PathBuf, String> {
    // Находим Python скрипт относительно текущего exe или рабочей директории
    if let Ok(exe) = std::env::current_exe() {
        if let Some(exe_dir) = exe.parent() {
            // В режиме разработки: src-tauri/target/debug/app -> src-tauri/python/main.py
            let mut dev_path = exe_dir.to_path_buf();
            dev_path.push("../../../src-tauri/python/main.py");
            if dev_path.exists() {
                return Ok(dev_path);
            }
            
            // В продакшене: app.app/Contents/MacOS/app -> python/main.py
            let mut prod_path = exe_dir.to_path_buf();
            prod_path.push("../Resources/python/main.py");
            if prod_path.exists() {
                return Ok(prod_path);
            }
        }
    }
    
    // Пробуем относительно рабочей директории
    if let Ok(cwd) = std::env::current_dir() {
        let mut path = cwd;
        path.push("src-tauri/python/main.py");
        if path.exists() {
            return Ok(path);
        }
    }
    
    Err("Python script not found".to_string())
}

async fn run_python_command(args: &[&str]) -> Result<String, String> {
    let python_path = get_python_path()?;
    
    let output = Command::new("python3")
        .arg(&python_path)
        .args(args)
        .output()
        .map_err(|e| format!("Failed to execute Python: {}", e))?;
    
    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        Err(format!("Python command failed: {}", stderr))
    }
}

#[tauri::command]
async fn skygen_login(email: String, password: String) -> Result<AuthResponse, String> {
    let output = run_python_command(&["login", &email, &password]).await?;
    
    serde_json::from_str::<AuthResponse>(&output)
        .map_err(|e| format!("Failed to parse response: {}", e))
}

#[tauri::command]
async fn skygen_signup(email: String, password: String) -> Result<AuthResponse, String> {
    let output = run_python_command(&["signup", &email, &password]).await?;
    
    serde_json::from_str::<AuthResponse>(&output)
        .map_err(|e| format!("Failed to parse response: {}", e))
}

#[tauri::command]
async fn skygen_enroll_device() -> Result<AuthResponse, String> {
    let output = run_python_command(&["enroll"]).await?;
    
    serde_json::from_str::<AuthResponse>(&output)
        .map_err(|e| format!("Failed to parse response: {}", e))
}

#[tauri::command]
async fn skygen_connect() -> Result<AuthResponse, String> {
    let output = run_python_command(&["connect"]).await?;
    
    serde_json::from_str::<AuthResponse>(&output)
        .map_err(|e| format!("Failed to parse response: {}", e))
}

#[tauri::command]
async fn skygen_get_status() -> Result<StatusResponse, String> {
    let output = run_python_command(&["test"]).await?;
    
    serde_json::from_str::<StatusResponse>(&output)
        .map_err(|e| format!("Failed to parse response: {}", e))
}

#[tauri::command]
fn install_dependencies() -> Result<String, String> {
    let python_dir = get_python_path()?.parent()
        .ok_or("Failed to get python directory")?
        .to_path_buf();
    
    let install_script = python_dir.join("install_desktop_env.py");
    if !install_script.exists() {
        return Err("Installation script not found".to_string());
    }
    
    // Запускаем скрипт установки
    let output = Command::new("python3")
        .arg(&install_script)
        .output()
        .map_err(|e| format!("Failed to run installation script: {}", e))?;
    
    if output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        Ok(format!("Installation completed successfully:\n{}", stdout))
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        let stdout = String::from_utf8_lossy(&output.stdout);
        Err(format!("Installation failed:\nSTDOUT: {}\nSTDERR: {}", stdout, stderr))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(Mutex::new(OverlayState::default()))
        .invoke_handler(tauri::generate_handler![
            show_overlay, hide_overlay, show_dim, hide_dim, start_outline, stop_outline, update_outline,
            skygen_login, skygen_signup, skygen_enroll_device, skygen_connect, skygen_get_status, install_dependencies
        ])
        .setup(|app| {
            // Настройка главного окна для поддержки полноэкранного режима
            #[cfg(target_os = "macos")]
            {
                if let Some(main_window) = app.get_webview_window("main") {
                    let main_clone = main_window.clone();
                    let app_handle = app.handle().clone();
                    let _ = app_handle.run_on_main_thread(move || unsafe {
                        if let Ok(ns_win_ptr) = main_clone.ns_window() {
                            let ns_win: id = ns_win_ptr as id;
                            let behavior = NSWindowCollectionBehavior::NSWindowCollectionBehaviorCanJoinAllSpaces
                                | NSWindowCollectionBehavior::NSWindowCollectionBehaviorFullScreenPrimary;
                            let _: () = msg_send![ns_win, setCollectionBehavior: behavior];
                        }
                    });
                }
            }

            // Глобальный хоткей: Option+Space — переключение оверлея
            #[cfg(target_os = "macos")]
            {
                use tauri_plugin_global_shortcut::GlobalShortcutExt;
                let handle = app.handle();
                handle.plugin(tauri_plugin_global_shortcut::Builder::new().build())?;
                handle.global_shortcut().on_shortcut("Option+Space", |app, _shortcut, _event| {
                    let state: tauri::State<'_, Mutex<OverlayState>> = app.state();
                    let visible_now = {
                        let guard = state.lock().unwrap();
                        guard.visible
                    };
                    if visible_now {
                        let _ = hide_overlay(app.clone(), state);
                    } else {
                        let _ = show_overlay(app.clone(), state);
                    }
                })?;
            }

            // Обработка закрытия приложения - убиваем outline процесс
            {
                let app_handle = app.handle().clone();
                let app_handle_clone = app_handle.clone();

                app_handle.listen("tauri://close-requested", move |_event| {
                    let state: tauri::State<'_, Mutex<OverlayState>> = app_handle_clone.state();
                    let mut s = state.lock().unwrap();

                    // Закрываем stdin, если открыт
                    s.outline_stdin.take();

                    // Завершаем процесс, если он есть
                    if let Some(mut child) = s.outline_process.take() {
                        let _ = child.kill();
                    }

                    // macOS: добиваем helper через pkill
                    #[cfg(target_os = "macos")]
                    {
                        let _ = std::process::Command::new("/usr/bin/pkill")
                            .arg("-f")
                            .arg("OutlineHelper")
                            .status();
                    }
                });
            }

            // Логирование только в debug режиме
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}