import React, { useContext } from 'react';
import { CvModel } from '../../Interfaces/CvInterfaces';
import './Cv2.css';
import { Document, Page, PDFDownloadLink, StyleSheet, Text, View } from '@react-pdf/renderer';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface CvProps {
    cv: CvModel;
    isEditableTemplate: boolean;
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        textAlign: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: -5,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    sectionContent: {
        marginBottom: 5,
    },
    listItem: {
        fontSize: 12,
        color: '#666',
    },
    experienceTitle: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    experienceCompany: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    fontWeight600:{
        fontWeight:'bold'
    } 
});

export const Pdf2 = ({ cv }:CvProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{cv.firstName} {cv.lastName}</Text>
                    <Text style={styles.subtitle}>
                        <Text style={ styles.fontWeight600 }>{cv.job}</Text> {cv.objective}
                    </Text>
                    <Text>{cv.userId} | {cv.email}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    {cv.experiences.map((experience, index) => (
                        <View key={index} style={styles.sectionContent}>
                            <Text style={styles.experienceTitle}>
                                {experience.jobTitle} - {experience.startJobDate} to {experience.endJobDate}
                            </Text>
                            <Text style={styles.experienceCompany}>{experience.company}</Text>
                            <Text style={styles.listItem}>{experience.jobDescription}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    {cv.skills.map((skill, index) => (
                        <Text style={styles.listItem} key={index}>
                            • {skill}
                        </Text>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    <Text style={styles.listItem}>{cv.degree} - {cv.school}</Text>
                    <Text style={styles.listItem}>{cv.schoolDepartment}, {cv.schoolCity}, {cv.schoolCountry}</Text>
                    <Text style={styles.listItem}>{cv.startSchoolDate} - {cv.endSchoolDate}</Text>
                </View>
            </Page>
        </Document>
    );
};


const Cv2: React.FC<CvProps> = ({ cv ,isEditableTemplate}) => {
    let location = useLocation();
    const saveCvToDatabase = () => {
        if(!getCvsErrors){axios
            .post(`http://localhost:8000/addcv/`, cv)
            .then((res) => {
                
                console.log(res);
                setUserCvs({
                    ...userCvs, 
                    data: [...(userCvs.data), cv] 
                });
            })
            .catch((error) => {
                setGetCvsErrors(error.response.data.error);
                console.log(error.response.data.error);
                console.log(error);
                
            });}
        
            
    };

    const editCv = ()=>{
        axios
            .put(`http://127.0.0.1:8000/editcv/`,cv)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                
                console.log(error)
            });
    }
    const {setUserCvs,userCvs,getCvsErrors,setGetCvsErrors} = useContext(UserContext);
    return (
        <div className="container cv-container  p-1 overflow-hidden" style={{minHeight: "550px",maxHeight:"550px"}}>
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
            {!isEditableTemplate&&(<PDFDownloadLink
                        document={<Pdf2 cv={cv} isEditableTemplate={false} />}
                        fileName={`${cv.cvName}.pdf`}
                        className="position-absolute  start-50 translate-middle-x"
                        style={{ bottom: "-50px" }}
                        onClick={()=>{location.pathname.includes("edit")?editCv():saveCvToDatabase()}}
                    >
                        <button className="btn btn-success">Download</button>
            </PDFDownloadLink>)
            }
            
        </div>
    );
};

export default Cv2;

