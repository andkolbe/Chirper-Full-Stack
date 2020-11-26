import * as React from 'react';

const Template: React.FC<TemplateProps> = (props) => {
    return (
        <div className="container">
                <section className="row mt-3 justify-content-center">
                    <div className="col-12">
                        <h1 className="text-center">Template</h1>
                    </div>
                </section>
            </div>
    );
}

interface TemplateProps {}

export default Template;