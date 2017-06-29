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

    static RemoveHtmlTags(inputString: string): string {
        var output: string = inputString;

        // List of things to find and replace. 
        // For example, replace a close then open span with one that has a line feed in it to display better on screen.
        let replaceThis: string[] = ["</span><span"];
        let withThis: string[] = ["</span>\n<span"];

        // Generic regex to remove ALL html tags
        //let htmlRegex = /<[^>]*>/g;

        // Specific regex to remove only these HTML tags
        let htmlRegex = /<(\/)*(h1|h2|h3|h4|h5|h6|div|span|p|image)[^>]*>/g;

        for (var i = 0; i < replaceThis.length; i++) {
            output = output.replace(replaceThis[i], withThis[i]);
        }

        output = output.replace(htmlRegex, "");

        return output;
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