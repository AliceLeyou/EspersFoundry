type StatusEffect = {
    id: string;
    label: string;
    icon: string;
};

class ConfigUtility {
    static GetStatusEffect(getBy: "id" | "label" | "icon", value: string): StatusEffect {
        const statusEffect = CONFIG.statusEffects.find((effect) => effect[getBy] === value);
        if(!statusEffect) {
            throw new Error(`Status effect with ${getBy} ${value} not found`);
        }
        return statusEffect;
    }
    
    static GetStatusEffectById(id: string): StatusEffect {
        return ConfigUtility.GetStatusEffect("id", id);
    }
    
    static GetStatusEffectByLabel(label: string): StatusEffect {
        return ConfigUtility.GetStatusEffect("label", label);
    }
    
    
    static GetStatusEffectByIcon(icon: string): StatusEffect {
        return ConfigUtility.GetStatusEffect("icon", icon);
    }
}

export default ConfigUtility;