import { React, useState } from 'react';
import './NewsItemForm.css';
import { useForm } from 'react-hook-form';
import NavBar from '../../components/NavBar/NavBar';
import PageHeader from '../../components/PageHeader/PageHeader';
import logo from '../../assets/mock-logo.jpg';
import Footer from '../../components/Footer/Footer';
import axios from "axios";

function NewsItemForm() {
    const { register, handleSubmit, formState: { errors }, resetField } = useForm();
    const source = axios.CancelToken.source();
    const [ sentSuccess, toggleSentSuccess ] = useState(false);

    // if page gets unmounted, abort request
    // useEffect(() => {
    //     return function cleanup() {
    //         source.cancel();
    //     }
    // }, []);

    async function onFormSubmit(data) {
        try {
            const result = await axios.post("http://localhost:3001/news", {
                title: data.title,
                author: data.author,
                content: data.content,
            }, {
                cancelToken: source.token,
            })
            toggleSentSuccess(true)
            resetField("title");
            resetField("author");
            resetField("content");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <NavBar></NavBar>
            <PageHeader icon={logo} title="New News!" />
            <main>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="form-container">
                        <h3>Vul hier je nieuws in!</h3>

                        <div>
                            <label htmlFor="title"> Titel </label>
                            <input
                                type="text"
                                id="title"
                                {...register("title", {
                                    required: {
                                        value: true,
                                        message: "Titel is verplicht",
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Titel moet minimaal drie karakters bevatten",
                                    },
                                })}
                            />
                            {errors.title && <p>{errors.title.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="author"> Auteur </label>
                            <input
                                type="text"
                                id="author"
                                {...register("author", {
                                    required: {
                                        value: true,
                                        message: "Auteur is verplicht"
                                    },
                                })}
                            />
                            {errors.author && <p>{errors.author.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="content"> Content </label>
                            <textarea
                                type="text"
                                id="content"
                                rows={10}
                                cols={40}
                                {...register("content", {
                                    required: {
                                        value: true,
                                        message: "Content is verplicht"
                                    },
                                })}
                            />
                            {errors.content && <p>{errors.content.message}</p>}
                        </div>

                        <div>
                            <button
                                type="submit"
                            >
                                Verstuur
                            </button>
                        </div>

                        {sentSuccess && 
                            <div>
                                <h3>Form sent!</h3>     
                            </div>
                        }
                    </div>
                </form>
            </main>
            <Footer />
        </>
    );
}

export default NewsItemForm;
