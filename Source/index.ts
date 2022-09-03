import Logger from "./Utils/Logger";
import PreloadTemplates from "./PreloadTemplates";
import { RegisterSettings } from "./Utils/Settings";
import CleanUpUI from "./Modules/CleanUI/CleanUi";

Hooks.once("init", async () => {
	RegisterSettings();
	await PreloadTemplates();
});

Hooks.once("init", CleanUpUI);

Hooks.once("setup", () => {
	Logger.Log("Template module is being setup.")
});

Hooks.once("ready", () => {
	Logger.Ok("Template module is now ready.");
});