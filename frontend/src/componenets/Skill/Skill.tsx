import React, { useState } from "react";
import "./style.css";
type SkillProps = {
    skill: string;
    index: number;
    deleteSkill: (index: number) => void;
};

const Skill = ({ skill, index, deleteSkill }: SkillProps) => {
    const [isHovered, setIsHovered] = useState(0);
    return (
        <>
            <div
                className="skill px-3 py-2 rounded-1 m-1 position-relative text-break"
                style={{ background: "var(--main-color)" }}
                onMouseEnter={() => setIsHovered(1)}
                onMouseLeave={() => setIsHovered(0)}
            >
                {
                    <>
                        {skill}
                        {isHovered === 1 && (
                            <>
                                <div className="layout"></div>
                                <button
                                    className="deleteBtn btn btn-danger  translate-middle"
                                    onClick={() => deleteSkill(index)}
                                >
                                    X
                                </button>
                            </>
                        )}
                    </>
                }
            </div>
        </>
    );
};

export default Skill;
