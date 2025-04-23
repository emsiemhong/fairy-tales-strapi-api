import type { Schema, Struct } from '@strapi/strapi';

export interface RichTextImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_rich_text_image_blocks';
  info: {
    displayName: 'Image Block';
  };
  attributes: {
    image_block: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface RichTextTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_rich_text_text_blocks';
  info: {
    displayName: 'Text Block';
  };
  attributes: {
    content_text: Schema.Attribute.Blocks;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'rich-text.image-block': RichTextImageBlock;
      'rich-text.text-block': RichTextTextBlock;
    }
  }
}
