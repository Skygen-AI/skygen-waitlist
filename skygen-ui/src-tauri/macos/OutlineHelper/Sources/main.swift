import AppKit

final class OutlineWindow: NSWindow {
    init(frame: NSRect, color: NSColor) {
        super.init(
            contentRect: frame,
            styleMask: [.borderless],
            backing: .buffered,
            defer: false
        )
        self.level = .screenSaver
        self.isOpaque = false
        self.backgroundColor = .clear
        self.ignoresMouseEvents = true
        self.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary, .transient]

        let outline = CAShapeLayer()
        outline.fillColor = NSColor.clear.cgColor
        outline.strokeColor = color.cgColor
        outline.lineWidth = 4.0
        let path = CGMutablePath()
        path.addRect(self.contentView!.bounds)
        outline.path = path
        self.contentView!.wantsLayer = true
        self.contentView!.layer?.addSublayer(outline)
    }
}

func parseColor(_ hex: String) -> NSColor {
    var hexSanitized = hex.trimmingCharacters(in: .whitespacesAndNewlines)
    if hexSanitized.hasPrefix("#") {
        hexSanitized.removeFirst()
    }
    var rgb: UInt64 = 0
    Scanner(string: hexSanitized).scanHexInt64(&rgb)
    let r = CGFloat((rgb >> 16) & 0xFF) / 255.0
    let g = CGFloat((rgb >> 8) & 0xFF) / 255.0
    let b = CGFloat(rgb & 0xFF) / 255.0
    return NSColor(calibratedRed: r, green: g, blue: b, alpha: 1.0)
}

let args = CommandLine.arguments
var colorHex = "FF4D4F"
if let idx = args.firstIndex(of: "--color"), args.count > idx + 1 {
    colorHex = args[idx + 1]
}

let app = NSApplication.shared
app.setActivationPolicy(.accessory)

let screenFrame = NSScreen.main?.frame ?? NSRect(x: 0, y: 0, width: 1280, height: 800)
let window = OutlineWindow(frame: screenFrame, color: parseColor(colorHex))
window.makeKeyAndOrderFront(nil)

RunLoop.main.run()
