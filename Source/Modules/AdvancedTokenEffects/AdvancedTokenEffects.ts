import ConfigUtility from "../../Utils/ConfigUtility";
import Logger from "../../Utils/Logger";
import ApplyStatusEffectsForm from "./ApplyStatusEffectsForm";

type ContextMenuElement = {
    name: string;
    icon: string;
    callback: (e: any) => void;
}

function GetCombatantList(combatTracker: CombatTracker): Combatant[] {
    const combatants: Combatant[] = [];
    combatTracker.combats.forEach((combat) => {
        combat.combatants.forEach((combatant) => {
            combatants.push(combatant);
        });
    });
    return combatants;
}

function ReplaceTokenEffectsForCombatant(token: TokenDocument, effectNodes: HTMLCollectionOf<Element>) {
    for(let i = 0; i < effectNodes.length; ++i) {
        const effectIcon = effectNodes[i].getAttribute("src");
        if(!effectIcon) continue;
        const statusEffect = ConfigUtility.GetStatusEffectByIcon(effectIcon);
        // @ts-ignore incomplete foundry types
        const effectName = game.i18n.localize(statusEffect.label);
        effectNodes[i].setAttribute("data-tooltip", effectName);
        effectNodes[i].addEventListener("click", (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            Logger.Ok(`Toggle ${effectName} status effect for ${token.name}`);
            // @ts-ignore incomplete foundry types
            token.toggleActiveEffect(statusEffect);
            $("#tooltip").removeClass("active");
        });
    }
}

function ExtendContextMenu(html: JQuery, contextMenu: ContextMenuElement[]) {
    contextMenu.splice(1, 0, {
        name: "AdvancedTokenEffects.ContextMenu.StatusEffect", 
        icon: "<i class='fa-solid fa-hurricane'></i>", 
        callback: (e: any) => {
            const combatantId = e.data("combatant-id");
            // @ts-ignore incomplete foundry types
            const token: TokenDocument = game.combat.combatants.get(combatantId).token;
            new ApplyStatusEffectsForm(token).render(true);
        }
    });
}

function ReplaceTokenEffects(combatTracker: CombatTracker, html: JQuery): void {
    Logger.Ok("Replace token effects with advanced token effects");
    const combatants = GetCombatantList(combatTracker);

    const combatantNodes = html.find($(".combatant.actor"));
    for(let i = 0; i < combatantNodes.length; ++i) {
        const combatantId = combatantNodes[i].getAttribute("data-combatant-id");
        const token = combatants.find((combatant) => combatant.id === combatantId)?.token;
        const effectNodes = combatantNodes[i].getElementsByClassName("token-effect");

        if(token) {
            ReplaceTokenEffectsForCombatant(token, effectNodes);
        }
    }
}

function AdvancedTokenEffects(): void {
    Hooks.on("renderCombatTracker", ReplaceTokenEffects);
    Hooks.on("getCombatTrackerEntryContext", ExtendContextMenu);
}

export default AdvancedTokenEffects;