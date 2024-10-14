import React from 'react';
import { CvModel } from '../../Interfaces/CvInterfaces';
import './Cv2.css';

interface CvProps {
    cv: CvModel;
}

const Cv2: React.FC<CvProps> = ({ cv }) => {
    return (
        <div className="container cv-container mt-5 p-4">
            <div className="text-center">
                <div className="text-dark mb-n5 text0" style={{ zIndex: 1 }}>
                    <h1>
                        <strong>{cv.firstName} {cv.lastName}</strong>
                    </h1>
                </div>
                <div className="mb-n5 pt-4 pb-3 bg-gray-light text-dark" style={{ marginTop: '-30px', borderRadius: '20px' }}>
                    <p>
                        <span className='fw-600'>{cv.job}</span>
                        <span> </span>
                        <span>{cv.objective}</span>
                    </p>
                </div>
                <div className="bg-dark text-white w-75 m-auto rounded position-relative" style={{transform: 'translateY(-50%)', zIndex: 1 }}>
                    <p>
                        <span>{cv.userId}</span>
                        <span style={{ marginLeft: '20px' }}>{cv.email}</span>
                    </p>
                </div>
            </div>


            <div className="d-flex justify-content-center">
                <div className='w-90'>
                    <h2 className='text-center mt-1 text-dark fw-900'>Experience</h2>
                    <hr className='text-dark' />

                    <div className="section">
                        {cv.experiences.map((experience, index) => (
                            <div key={index} className="mb-3">
                                <h5 className='text-dark'>{experience.jobTitle} - {experience.startJobDate} to {experience.endJobDate}</h5>
                                <p className='text-dark'><strong>{experience.company}</strong></p>
                                <p className='text-secondary'>{experience.jobDescription}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className='text-center mt-1 text-dark fw-900'>Skills</h2>
                    <hr className='text-dark' />
                    <div className="section">
                        <ul>
                            {cv.skills.map((skill, index) => (
                                <li className='text-secondary' key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>

                    <h2 className='text-center mt-1 text-dark fw-900'>Education</h2>
                    <hr className='text-dark' />

                    <div className="section">
                        <p className='text-dark'>{cv.degree} - {cv.school}</p>
                        <p className='text-dark'>{cv.schoolDepartment}, {cv.schoolCity}, {cv.schoolCountry}</p>
                        <p className='text-secondary'>{cv.startSchoolDate} - {cv.endSchoolDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cv2;

