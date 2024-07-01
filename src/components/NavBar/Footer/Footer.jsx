import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p>&copy; 2024 Nia Ecotienda. Todos los derechos reservados.</p>
            <p>
              <a href="/privacy-policy" className="text-white">
                Política de Privacidad
              </a>{' '}
              |{' '}
              <a href="/terms-of-service" className="text-white">
                Términos de Servicio
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

