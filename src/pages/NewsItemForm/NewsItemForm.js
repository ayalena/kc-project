import React from 'react';
import './NewsItemForm.css';
import { useForm } from 'react-hook-form';
import NavBar from '../../components/NavBar/NavBar';
import PageHeader from '../../components/PageHeader/PageHeader';
import logo from '../../assets/mock-logo.jpg';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';

function NewsItemForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    function onFormSubmit(data) {
        console.log(data);
    }

    function handleClick() {
        console.log('form submitted');
    }

    // console.log('ERRORS', errors);
    return (
        <>
            <NavBar></NavBar>
            <PageHeader icon={logo} />
            <main>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="form-container">
                        {/* <fieldset> */}
                        <legend>Vul hier je nieuws in!</legend>

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

                        <div id="checkbox">
                            <input
                                type="checkbox"
                                id="terms-and-conditions"
                                {...register("terms-and-conditions")}
                            />
                            Ik ga akkoord met de voorwaarden
                        </div>

                        <div>
                            <Button
                                className="add-button"
                                type="button"
                                onClick={handleClick}
                                text="ADD NEW POST!"
                            >
                            </Button>
                        </div>

                        {/* </fieldset> */}
                    </div>
                </form>
            </main>
            <Footer />
        </>
    );
}

export default NewsItemForm;
