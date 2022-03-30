/*jshint esversion: 9 */

/**
 * Mind Image component is saved in the WP database to be proceed in frontend
 */
export default class MindImage extends React.Component {
  constructor(props) {
    super(...arguments);

  }

  render() {

    const { image } = this.props;

    console.log('MindImage - save image data');
    console.log(image);

    /**
     * function that checks the image caption tag and distinguishes whether it is a video or image
     * @param {image object} img 
     * @returns String - the key of the object given based on the caption tag of WP image (currently only Vimeo video can be distinguished)
     */
    const getType = (img) => {

      let type = 'image'

      //VIMEO -----
      const VimeoExp = /^https?:\/\/player.vimeo.com\/\b([-a-zA-Z0-9()@:%_\+.~#?&\/=])*$/
      const VimeoReg = new RegExp(VimeoExp);
      if (VimeoReg.test(img.alt)) {
        type = 'vimeo'
      }
      return type;
    }


    return (
      <img
        className='orbit-image'
        src={image.url}
        alt={image.alt}
        data-id={image.id}
        //width={image.i_w}
        //height={image.i_h}
        description={image.description}
        title={image.title}
        srcset={image.srcset}
        sizes={image.sizes}
        caption={image.caption}
        type={getType(image)}
      />
    )
  }

};
