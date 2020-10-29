import React, { memo } from "react";
import "../scss/OfferBannerComponent.scss";
function OfferBannerComponent({ title, image, subTitle }) {
	return (
		<div className="offer-content">
			<span className="title">{title}</span>
			<img src={image} alt="offer" className="offer-img" />
			<span className="sub-title">{subTitle}</span>
		</div>
	);
}

export default memo(OfferBannerComponent);
