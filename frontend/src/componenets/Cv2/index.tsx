import React, { useContext } from 'react';
import { CvModel } from '../../Interfaces/CvInterfaces';
import './Cv2.css';
import { Document, Page, PDFDownloadLink, StyleSheet, Text, View } from '@react-pdf/renderer';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { faGratipay } from '@fortawesome/free-brands-svg-icons';

interface CvProps {
    cv: CvModel;
    isEditableTemplate: boolean;
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 15,
        minHeight: 550,
        maxHeight: 550,
    },
    header: {
        textAlign: 'center',
        marginBottom: 10, // Add margin to push elements below it
    },
    nameTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: -10,
    },
    jobSection: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#d3d3d3',
        borderRadius: 20,
        fontSize: 10,
        marginTop: -15,
        zIndex: -1,
        padding: 30,
    },
    contactSection: {
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
        width: '75%',
        marginHorizontal: 'auto',
        borderRadius: 5,
        fontSize: 10,
        marginTop: -5,
    },
    section: {
        marginVertical: 10,
        fontSize: 10,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    hr: {
        borderBottomWidth: 1,
        borderBottomColor: '#b9b2b6',
        marginVertical: 5,
    },
    listItem: {
        color: '#6c757d',
        fontSize: 10,
    },
    experienceTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 3,
    },
    experienceCompany: {
        fontSize: 10,
        marginBottom: 3,
    },
    list: {
        marginVertical: 5,
    },
    educationDetails: {
        fontSize: 10,
        marginBottom: 5,
    },
});


export const Pdf2 = ({ cv }: CvProps) => {
    return (
        <Document>
            <Page size="A4" style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.nameTitle}>{cv.firstName} {cv.lastName}</Text>
                    <View style={styles.jobSection}>
                        <Text>
                            <Text style={{ fontWeight: 600 }}>{cv.job}</Text> {cv.objective}
                        </Text>
                    </View>
                    <View style={styles.contactSection}>
                        <Text>{cv.city}, {cv.country} | {cv.email}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    <View style={styles.hr} />
                    {cv.experiences.map((experience, index) => (
                        <View key={index} style={styles.section}>
                            <Text style={styles.experienceTitle}>
                                {experience.jobTitle} - {experience.startJobDate} to {experience.endJobDate}
                            </Text>
                            <Text style={styles.experienceCompany}><strong>{experience.company}</strong></Text>
                            <Text style={styles.listItem}>{experience.jobDescription}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.hr} />
                    <View style={styles.list}>
                        {cv.skills.map((skill, index) => (
                            <Text style={styles.listItem} key={index}>• {skill}</Text>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    <View style={styles.hr} />
                    <Text style={styles.educationDetails}>{cv.degree} - {cv.school}</Text>
                    <Text style={styles.educationDetails}>{cv.schoolDepartment}, {cv.schoolCity}, {cv.schoolCountry}</Text>
                    <Text style={styles.listItem}>{cv.startSchoolDate} - {cv.endSchoolDate}</Text>
                </View>
            </Page>
        </Document>
    );
};


const Cv2: React.FC<CvProps> = ({ cv, isEditableTemplate }) => {
    let location = useLocation();
    const saveCvToDatabase = () => {
        if (!getCvsErrors) {
            axios
                .post(`http://localhost:8000/addcv/`, cv)
            .then((res) => {

                console.log(res);
                cv.cvId=res?.data?.cvId;
                setUserCvs((prevUserCvs:any) => ({
                    ...prevUserCvs,
                    data: [
                        ...(Array.isArray(prevUserCvs.data) ? prevUserCvs.data : []), // Ensure data is an array
                        cv// hereeeeeeeeeeee
                    ]
                }));
            })
            .catch((error) => {
                setGetCvsErrors(error.response.data.error);
                console.log(error.response.data.error);
                console.log(error);

            });
        }


    };

    const editCv = () => {
        axios
            .put(`http://127.0.0.1:8000/editcv/`, cv)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {

                console.log(error)
            });
    }
    const { setUserCvs, userCvs, getCvsErrors, setGetCvsErrors } = useContext(UserContext);
    return (
        <div className="container cv-container p-1 mt-3" style={{ minHeight: "550px", maxHeight: "550px" }}>
            <div className="text-center">
                <div className="text-dark text0" style={{ zIndex: 1, transform: 'translateY(80%)' }}>
                    <h1 style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {cv.firstName} {cv.lastName}
                    </h1>
                </div>
                <div className="mb-n5 pt-4 pb-3 bg-gray-light text-dark" style={{ borderRadius: '20px', fontSize: 10 }}>
                    <p>
                        <span className='fw-600'>{cv.job}</span>
                        <span> </span>
                        <span>{cv.objective}</span>
                    </p>
                </div>
                <div className="bg-dark text-white w-75 m-auto rounded position-relative" style={{ transform: 'translateY(-50%)', zIndex: 1, fontSize: 10 }}>
                    <p>
                        <span>{cv.city},{cv.country}</span>
                        <span style={{ marginLeft: '20px' }}>{cv.email}</span>
                    </p>
                </div>
            </div>

            <div className="d-flex justify-content-center">
                <div className='w-90'>
                    <h2 className='text-center mt-1 text-dark fw-900' style={{ fontSize: 15 }}>Experience</h2>
                    <hr className='text-dark' />

                    <div className="section" style={{ fontSize: 10 }}>
                        {cv.experiences.map((experience, index) => (
                            <div key={index} className="mb-3">
                                <h5 className='text-dark' style={{ fontSize: 10, fontWeight: 'bold' }}>{experience.jobTitle} - {experience.startJobDate} to {experience.endJobDate}</h5>
                                <p className='text-dark'><strong>{experience.company}</strong></p>
                                <p className='text-secondary'>{experience.jobDescription}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className='text-center mt-1 text-dark fw-900 ' style={{ fontSize: 15 }}>Skills</h2>
                    <hr className='text-dark' />
                    <div className="section" style={{ fontSize: 10 }}>
                        <ul>
                            {cv.skills.map((skill, index) => (
                                <li className='text-secondary' key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>

                    <h2 className='text-center mt-1 text-dark fw-900' style={{ fontSize: 15 }}>Education</h2>
                    <hr className='text-dark' />

                    <div className="section" style={{ fontSize: 10 }}>
                        <p className='text-dark'>{cv.degree} - {cv.school}</p>
                        <p className='text-dark'>{cv.schoolDepartment}, {cv.schoolCity}, {cv.schoolCountry}</p>
                        <p className='text-secondary'>{cv.startSchoolDate} - {cv.endSchoolDate}</p>
                    </div>
                </div>
            </div>
            {!isEditableTemplate && (<PDFDownloadLink
                document={<Pdf2 cv={cv} isEditableTemplate={false} />}
                fileName={`${cv.cvName}.pdf`}
                className="position-absolute  start-50 translate-middle-x"
                style={{ bottom: "-50px" }}
                onClick={() => { location.pathname.includes("edit") ? editCv() : saveCvToDatabase() }}
            >
                <button className="btn btn-success">Download</button>
            </PDFDownloadLink>)
            }

        </div>
    );
};

export default Cv2;

