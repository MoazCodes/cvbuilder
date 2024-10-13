import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface activityProps {
    activity: string;
    index: number;
    deleteActivity: (index: number) => void;
}

const ExtracurricularActivity = ({
    activity,
    index,
    deleteActivity,
}: activityProps) => {
    return (
        <>
            <div className="col-12 mb-3 border d-flex justify-content-between align-items-center p-3">
                <div>{activity}</div>
                <div className="projectIcons">
                    <div className="delete">
                        <FontAwesomeIcon
                            icon={faTrash}
                            role="button"
                            onClick={() => deleteActivity(index)}
                        />
                    </div>
                    <div className="edit"></div>
                </div>
            </div>
        </>
    );
};

export default ExtracurricularActivity;
