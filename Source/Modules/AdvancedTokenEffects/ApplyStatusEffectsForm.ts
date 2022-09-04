//  @ts-nocheck
import ConfigUtility from "../../Utils/ConfigUtility";
import Logger from "../../Utils/Logger";

type ApplyStatusEffectsTemplate = {
    effects: {
       localizedLabel: string;
       active: boolean;
       id: string;
       label: string;
       icon: string;
    }[];
};

type ApplyStatusEffectsReturn = Record<string, boolean>;

class ApplyStatusEffectsForm extends FormApplication {
    token: TokenDocument;

    constructor(token: TokenDocument) {
      super(token, { title: `Apply status effects to ${token.name}`});
      this.token = token;
    }
  
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ['form'],
        popOut: true,
        template: `/modules/EspersFoundry/Templates/ApplyStatusEffectsForm.html`,
        id: 'apply-status-effects',
        title: 'Apply status effects',
      });
    }
  
    getData(): ApplyStatusEffectsTemplate {
      const templateData = {
        effects: CONFIG.statusEffects.map((effect) =>  ({ 
            localizedLabel: game.i18n.localize(effect.label), 
            active: this.token.hasStatusEffect(effect.id),
            ...effect 
        }))
      };
      return templateData;
    }
  
    activateListeners(html: JQuery): void {
      super.activateListeners(html);
    }
  
    async _updateObject(event: SubmitEvent, formData: ApplyStatusEffectsReturn): Promise<void> {
        Logger.Ok(event);
        if(event.type === "submit" && event.submitter?.getAttribute("name") === "submit") {
            const entries = Object.entries(formData);
            for(let i = 0; i < entries.length; ++i) {
                const [id, active] = entries[i];
                if(this.token.hasStatusEffect(id) && active) continue;
                if(!this.token.hasStatusEffect(id) && !active) continue;
                const effect = ConfigUtility.GetStatusEffectById(id);
                Logger.Ok(`Toggle ${game.i18n.localize(effect.label)} status effect for ${this.token.name}`);
                await this.token.toggleActiveEffect(effect);
            }
        } else if(event.type === "submit" && event.submitter?.getAttribute("name") === "clear") {
            for(let i = 0; i < CONFIG.statusEffects.length; ++i) {
                if(this.token.hasStatusEffect(CONFIG.statusEffects[i].id)) {
                    await this.token.toggleActiveEffect(CONFIG.statusEffects[i]);
                }
            }
        }
    }
}
  
export default ApplyStatusEffectsForm;