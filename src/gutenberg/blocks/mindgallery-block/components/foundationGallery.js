import * as React from 'react';
import classnames from 'classnames';
import { GlobalClasses, GlobalStyles } from './global';
import { BackgroundStyles } from './background';
import MindImage from './utils/mind-image';
const { __ } = wp.i18n;
const { RichText, getFontSizeClass } = wp.blockEditor;
const FoundationGallery = ({ className, attributes }) => {
    const { captions, customFontSize, fontSize, fullwidth, gutter, gutterMobile, images, linkTo, } = attributes;
    const wrapperClasses = classnames(...GlobalClasses(attributes), 'orbit-container', {
        'has-fullwidth-images': fullwidth,
        [`has-margin`]: gutter > 0,
    });
    const wrapperStyles = Object.assign(Object.assign({}, GlobalStyles(attributes)), BackgroundStyles(attributes));
    const fontSizeClass = getFontSizeClass(fontSize);
    const figureClasses = classnames('blockgallery--figure', 'orbit-figure', {
        [`has-margin-bottom-${gutter}`]: gutter > 0,
        [`has-margin-bottom-mobile-${gutterMobile}`]: gutterMobile > 0,
        [fontSizeClass]: fontSizeClass,
    });
    const captionClasses = classnames('orbit-caption', 'blockgallery--caption', {
        [fontSizeClass]: fontSizeClass,
    });
    const captionStyles = {
        fontSize: fontSizeClass ? undefined : customFontSize,
    };
    return (React.createElement("div", { className: className },
        React.createElement("div", { className: "orbit", role: "region", "aria-label": "Favorite Space Pictures", "data-orbit": true, "data-options": "animInFromLeft:fade-in; animInFromRight:fade-in; animOutToLeft:fade-out; animOutToRight:fade-out;" },
            React.createElement("div", { className: "orbit-wrapper" },
                React.createElement("div", { className: "orbit-controls" },
                    React.createElement("button", { className: "orbit-previous" },
                        React.createElement("span", { className: "show-for-sr" }, __('Previous Slide', 'mindgallery')),
                        "\u25C0\uFE0E"),
                    React.createElement("button", { className: "orbit-next" },
                        React.createElement("span", { className: "show-for-sr" }, __('Next Slide', 'mindgallery')),
                        "\u25B6\uFE0E")),
                React.createElement("ul", { className: wrapperClasses, style: wrapperStyles }, images.map((image) => {
                    let href;
                    switch (linkTo) {
                        case 'media':
                            href = image.url;
                            break;
                        case 'attachment':
                            href = image.link;
                            break;
                    }
                    const imgClasses = classnames(image.id ? [`wp-image-${image.id}`] : null);
                    const img = React.createElement(MindImage, { image: image });
                    return (React.createElement("li", { key: image.id || image.url, className: "blockgallery--item orbit-slide" },
                        React.createElement("figure", { className: figureClasses },
                            href ? React.createElement("a", { href: href }, img) : img,
                            captions && image.caption && image.caption.length > 0 && (React.createElement(RichText.Content, { tagName: "figcaption", className: captionClasses, value: image.caption, styles: captionStyles })))));
                }))))));
};
export default FoundationGallery;
//# sourceMappingURL=foundationGallery.js.map