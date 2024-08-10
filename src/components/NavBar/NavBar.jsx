import React from 'react';
import CardWidget from './CardWidget/CardWidget';
import logo from '../../assets/imagenes/logo.png';
import { Link } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Stack, useBreakpointValue } from '@chakra-ui/react';

function NavBar({ title }) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box bg="gray.800" color="white" px="4">
      <Flex align="center" justify="space-between" py="2" wrap="wrap">
        <Link to="/">
          <img
            src={logo}
            width="180"
            height="120"
            alt="Logo"
          />
        </Link>
        <Flex
          align="center"
          display={{ base: 'none', md: 'flex' }}
          flex="1"
          justify="center"
        >
          <Stack direction="row" spacing="4">
            <Link className="nav-link" to="/category/shampoo">Shampoo</Link>
            <Link className="nav-link" to="/category/acondicionador">Acondicionador</Link>
            <Link className="nav-link" to="/category/cepillos">Cepillos</Link>
            <Link className="nav-link" to="/category/velas">Velas</Link>
          </Stack>
        </Flex>
        {isMobile ? (
          <>
            <Button
              variant="outline"
              colorScheme="whiteAlpha"
              aria-label="Open Categories"
              onClick={() => document.getElementById('navbarSupportedContent').classList.toggle('show')}
              rightIcon={<HamburgerIcon />}
            >
              Categorías
            </Button>
            <Box id="navbarSupportedContent" display="none" className="navbar-menu">
              <Stack spacing="4" mt="2" textAlign="center">
                <Link className="nav-link" to="/category/shampoo">Shampoo</Link>
                <Link className="nav-link" to="/category/acondicionador">Acondicionador</Link>
                <Link className="nav-link" to="/category/cepillos">Cepillos</Link>
                <Link className="nav-link" to="/category/velas">Velas</Link>
              </Stack>
            </Box>
          </>
        ) : (
          <CardWidget />
        )}
      </Flex>
      <style jsx>{`
        .nav-link {
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          transition: background-color 0.2s ease;
        }
        .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .navbar-menu.show {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </Box>
  );
}

export default NavBar;


