import React from 'react';
import Link from 'next/link';

function Error({ statusCode }) {
    return (
        <div className="site-content">
            <div className="ps-page--404">
                <div className="container">
                    <div className="ps-section__content">
                        <figure>
                            <img src="/img/404.jpg" alt="" />
                            <h3>Ohh! Page not found</h3>
                            <p>
                                It seems we can't find what you're looking for.{' '}
                                <br />
                                Go back to
                                <Link href="/">
                                    <a> Signin</a>
                                </Link>
                            </p>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;
