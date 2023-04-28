import React from 'react';
// import imageSrc from './mr_pavan.jpg';

function ContentWithImage() {
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
            maxWidth: '800px',
            margin: '0 auto',
            position: 'relative',
        },
        imageWrapper: {
            position: 'absolute',
            top: '50%',
            right: '-50px',
            transform: 'translateY(-50%)',
            borderRadius: '50%',
            border: '5px solid #fff',
            overflow: 'hidden',
            width: '100px',
            height: '100px',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)',
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        paragraph: {
            fontSize: '1.2rem',
            lineHeight: '1.6',
            textAlign: 'justify',
            color: '#555',
            marginBottom: '10px',
        },
        title: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#333',
            margin: '0',
        },
        subtitle: {
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#555',
            margin: '0',
            marginBottom: '1rem',
        },
        author: {
            fontSize: '1rem',
            fontStyle: 'italic',
            color: '#888',
            margin: '0',
        },
    };


    return (
        <>
            <div className='navbar temp' style={{ padding: '10px', marginBottom: '10px' }}>
                <a href='/' style={{ textDecoration: 'none', color: 'black' }}>Home</a>
            </div>

            <div style={styles.container}>
                <div>
                    <h1 style={{ textAlign: 'center' }}>Acknowledgement</h1>
                    <p style={styles.paragraph}>
                        We are delighted to recognize the remarkable achievement of a team of three individuals who collaborated to create an exceptional mini-project on the topic of Dijkstra's Algorithm Visualizer.
                    </p>
                    <p style={styles.paragraph}>
                        The team comprises Kottal Kalyana Chakravarthi - 20BEC022, Patel Dharmesh - 20BEC032, and Rajnish Kumar - 20BEC035 of IIIT Dharwad, who have displayed an unwavering commitment to excellence throughout the project's lifecycle. Their passion, dedication, and technical expertise have culminated in a masterpiece for this project.
                    </p>
                    <p style={styles.paragraph}>
                        We would like to extend our profound gratitude to the team's mentor, <a href='https://pavankumarphd.github.io/' _blank>Dr. Pavan Kumar C</a>, Assistant Professor in the Computer Science & Engineering Department, whose guidance and expertise have been critical to the project's success. Dr. Kumar's unwavering commitment to excellence and mentorship has been instrumental in shaping the team's exceptional work.
                    </p>

                    <p style={styles.paragraph}>
                        The Dijkstra's Algorithm Visualizer project developed by this team is a testament to their ingenuity and innovative thinking. The project's complexity, coupled with the team's technical proficiency, has resulted in an impressive product that showcases their talent and skillset.
                    </p>
                    <p style={styles.paragraph}>
                        In conclusion, we applaud the team's hard work, dedication, and perseverance, and we hope that this project will make a significant impact in the field of Computer Science.
                    </p>
                </div>
                {/* <div style={styles.imageWrapper}>
                    <img src={imageSrc} alt="Example" style={styles.image} />
                </div> */}
            </div>
        </>
    );
}

export default ContentWithImage;
