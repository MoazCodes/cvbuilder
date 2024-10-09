import React, { useEffect } from "react";

import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCopy,
    faFile,
    faThumbsUp,
    IconDefinition,
} from "@fortawesome/free-regular-svg-icons";
import {
    faCheck,
    faCloud,
    faFileArrowDown,
    faPen,
    faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

const iconsMap: { [key: string]: IconDefinition } = {
    faCopy: faCopy,
    faPen: faPen,
    faCheck: faCheck,
    faFileArrowDown: faFileArrowDown,
    faCloud: faCloud,
    faShieldHalved: faShieldHalved,
    faThumbsUp: faThumbsUp,
    faFile: faFile,
};

interface CardProps {
    title: string;
    content: string;
    color: string;
    svg: string;
}

const Card: React.FC<CardProps> = ({ title, content, color, svg }) => {
    return (
        <>
            <div className="col-md-1 d-sm-none d-md-block"></div>
            <div className="col-md-4 col-sm-12">
                <div
                    data-wow-duration="1.2s"
                    className="customCard py-5 px-4 bg-transparent text-white container-fluid border mb-2 position-relative wow animate__fadeInUp"
                    style={{
                        borderColor: `var(--${color}-500) !important`,
                        boxShadow: `var(--${color}-shadow)`,
                    }}
                >
                    <h5
                        className="title mb-3"
                        style={{ color: `var(--${color}-700)` }}
                    >
                        {title}
                    </h5>
                    <div
                        className="content w-80"
                        style={{ color: "var(--gray-600)", fontSize: "14px" }}
                    >
                        {content}
                    </div>
                    <div
                        className="iconContainer "
                        style={{
                            borderColor: `var(--${color}-500) !important`,
                        }}
                    >
                        <FontAwesomeIcon
                            icon={iconsMap[svg]}
                            style={{
                                fontSize: "25px",
                                color: `var(--${color}-500) !important`,
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="col-md-1 d-sm-none d-md-block"></div>
        </>
    );
};

export default Card;
