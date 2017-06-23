import { ISelectedProductAttributes } from './Interfaces/ISelectedProductAttributes';
import { IProductAttributeMappings, IProductAttributeMappingsValue } from './ClientData/ProductAttributeMappings';

export class AttributeConversionService {
    static ConvertFromObjectToString(
        selecetedAttributes: ISelectedProductAttributes[],
        attributes: IProductAttributeMappings[]
    ): string {
        var outputString: string = "";

        for (var i = 0; i < selecetedAttributes.length; i++) {
            let currActv: ISelectedProductAttributes = selecetedAttributes[i]
            let currAttr: IProductAttributeMappings = attributes[currActv.attributeIndex];

            var valueString: string = "";

            for (var j = 0; j < currActv.attributeValueIndexes.length; j++) {
                let actvVal: number = currActv.attributeValueIndexes[j];
                let currVal: IProductAttributeMappingsValue = attributes[currActv.attributeIndex].attribute_values[actvVal];

                valueString += `<span> ${currVal.name} </span>`;
            }

            outputString += `<span>${currAttr.text_prompt}${valueString}</span>`;
        }

        return outputString;
    }
}


/**
 * <span class="brand-color">尺寸：<span class="col-brand"> 中 </span></span><span>颜色：<span class="size"> 咖啡色 </span></span>
 *
 * <span class="brand-color">
 *     尺寸：
 *     <span class="col-brand"> 中 </span>
 * </span>
 * <span>
 *     颜色：
 *     <span class="size"> 咖啡色 </span>
 * </span>
 */