import Logger from "./Utils/Logger";
import PreloadTemplates from "./PreloadTemplates";
import { RegisterSettings } from "./Utils/Settings";
import CleanUpUI from "./Modules/CleanUI/CleanUi";
import AdvancedTokenEffects from "./Modules/AdvancedTokenEffects/AdvancedTokenEffects";

Hooks.once("init", async () => {
	RegisterSettings();
	await PreloadTemplates();
});


Hooks.once("init", CleanUpUI);


Hooks.once("init", AdvancedTokenEffects);


Hooks.once("setup", () => {
	Logger.Log("Espers Foundry is being setup.")
});


Hooks.once("ready", () => {
	Logger.Ok("Espers Foundry is now ready.");
});