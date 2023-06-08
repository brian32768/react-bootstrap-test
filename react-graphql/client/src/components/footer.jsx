import React from 'react'   // eslint-disable-line no-unused-vars
import Ping from './ping'

const Header = () => {
    return (
        <footer className="page_footer">
            <div className="page-footer__branding branding">
                <div className="block__content">
                    <hr />
                    status: <Ping />
                </div>
            </div>
        </footer>
    );
}
export default Header;

