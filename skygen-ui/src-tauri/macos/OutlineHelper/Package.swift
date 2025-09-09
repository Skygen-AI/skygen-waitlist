// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "OutlineHelper",
    platforms: [.macOS(.v13)],
    products: [
        .executable(name: "OutlineHelper", targets: ["OutlineHelper"])
    ],
    targets: [
        .executableTarget(
            name: "OutlineHelper",
            path: "Sources"
        )
    ]
)
