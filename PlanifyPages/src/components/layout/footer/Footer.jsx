

const Footer = () => {
    return (
        <footer
            id="page-footer"
            style={{
                background: "linear-gradient(90deg, #111827, #1f2937)",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 -10px 30px rgba(0,0,0,0.12)"
            }}
        >
            <div className="content py-3">
                <div className="row align-items-center font-size-sm">
                    <div className="col-sm-6 order-sm-2 mb-2 mb-sm-0 text-center text-sm-right">
                        <span style={{ color: "rgba(255,255,255,0.72)" }}>
                            Designed and developed with{" "}
                            <i className="fa fa-heart text-danger mx-1" />
                            by
                        </span>{" "}
                        <a
                            href="https://github.com/reyhanevaghar"
                            target="_blank"
                            rel="noreferrer"
                            className="font-w600"
                            style={{ color: "#fff", textDecoration: "none" }}
                        >
                            reyhane vaghar
                        </a>
                    </div>

                    <div className="col-sm-6 order-sm-1 text-center text-sm-left">
                        <a
                            href="https://github.com/reyhanevaghar"
                            target="_blank"
                            rel="noreferrer"
                            className="font-w600"
                            style={{ color: "#fff", textDecoration: "none" }}
                        >
                            @reyhanevaghar
                        </a>{" "}
                        <span style={{ color: "rgba(255,255,255,0.72)" }}>
                            © 2026 All rights reserved
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
