import Logger from "../../Utils/Logger";
import TokenEffects from "./TokenEffects";

function MakeAdvancedTokenEffect(Effect: TokenEffects, Image: Element): HTMLAnchorElement {
    const newEffect = document.createElement("a");
    newEffect.className = "combatant-control";
    newEffect.setAttribute("data-tooltip", Effect.toString());
    newEffect.appendChild(Image);
    return newEffect;
}

function ReplaceCurrentTokenEffects(): void {
    Logger.Ok("Replace all current token effects");
    const effectNodes = document.getElementsByClassName("token-effect");
    for(let i = 0; i < effectNodes.length; ++i) {
        Logger.Ok(`Replace token effect ${effectNodes[i].outerHTML}`);
        const effect = effectNodes[i];
        const parent = effect.parentNode;
        parent?.removeChild(effect);

        const newEffect = MakeAdvancedTokenEffect(TokenEffects.PARALYSIS, effect);
        parent?.appendChild(newEffect);
        Logger.Ok(`New token effect ${newEffect.outerHTML}`);
    }
}

export default ReplaceCurrentTokenEffects;