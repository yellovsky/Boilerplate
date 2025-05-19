import { ApiProperty } from '@nestjs/swagger';

import type { Seo } from '@repo/api-models';

import type { JSONLike } from 'src/shared/utils/json-like';

export class SeoDto implements JSONLike<Seo> {
  @ApiProperty({ example: 'Seo description', nullable: true, type: String })
  description: JSONLike<Seo>['description'];

  @ApiProperty({ example: 'Seo keywords', nullable: true, type: String })
  keywords: JSONLike<Seo>['keywords'];

  @ApiProperty({ example: 'Seo title', nullable: true, type: String })
  title: JSONLike<Seo>['title'];

  static from(seoData: JSONLike<Seo>): SeoDto {
    return new SeoDto(seoData.title, seoData.description, seoData.keywords);
  }

  constructor(title: JSONLike<string | null>, description: JSONLike<string | null>, keywords: JSONLike<string | null>) {
    this.title = title;
    this.description = description;
    this.keywords = keywords;
  }
}
