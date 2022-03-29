

interface MindImageType {
  url: string
  link: string
  id: string
  caption: string
}

export interface GalleryProps {
  className: string
  attributes: {
    captions: string
    customFontSize: string
    fontSize: string
    fullwidth: string
    gutter: number
    gutterMobile: number
    images: Array<MindImageType>
    linkTo: string
    typeTo: string
  }
}