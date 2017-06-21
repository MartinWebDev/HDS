export interface IProductAttributeMappingsValue {
    id: number;
    name: string;
    color_squares_rgb: any;
    image_squares_image: any;
    price_adjustment: number;
    weight_adjustment: number;
    cost: number;
    quantity: number;
    is_pre_selected: boolean;
    display_order: number;
    product_image_id: number;
    PictureUrl: string;
}

export interface IProductAttributeMappings {
    id: number;
    product_attribute_id: number;
    product_attribute_name: string;
    text_prompt: string;
    is_required: boolean;
    attribute_control_type_id: number;
    display_order: number;
    default_value: number;
    attribute_control_type_name: string;
    attribute_values: IProductAttributeMappingsValue[];
}
