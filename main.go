package main

import (
	"embed"
	"runtime"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	rt "github.com/wailsapp/wails/v2/pkg/runtime"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	appMenu := menu.NewMenu()
	if runtime.GOOS == "darwin" {
		appMenu.Append(menu.AppMenu()) // On macOS platform, this must be done right after `NewMenu()`
	}

	fMenu := appMenu.AddSubmenu("File")
	fMenu.AddText("Open", keys.CmdOrCtrl("o"), func(_ *menu.CallbackData) {
		// do something
	})
	fMenu.AddSeparator()
	fMenu.AddText("Quit", keys.CmdOrCtrl("q"), func(_ *menu.CallbackData) {
		// `rt` is an alias of "github.com/wailsapp/wails/v2/pkg/runtime" to prevent collision with standard package
		rt.Quit(app.ctx)
	})

	if runtime.GOOS == "darwin" {
		appMenu.Append(menu.EditMenu()) // on macos platform, we should append EditMenu to enable Cmd+C,Cmd+V,Cmd+Z... shortcut
	}

	if runtime.GOOS == "darwin" {
		appMenu.Append(menu.WindowMenu()) // On macOS platform, this must be done right after `NewMenu()`
	}

	hMenu := appMenu.AddSubmenu("Help")
	hMenu.AddText("Learn More", keys.CmdOrCtrl("o"), func(_ *menu.CallbackData) {
		// do something
	})

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "wails-angular-starter",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		DisableResize:    false,
		Frameless:        false,
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
		Menu: appMenu,
		Mac: &mac.Options{
			DisableZoom: false, // 允许绿色按钮窗口缩放
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}

func openFile(_ *menu.CallbackData) {

}
