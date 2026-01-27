import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmModal({ show, title, message, onConfirm, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
        borderRadius: '15px',
        overflow: 'hidden',
        border: '3px solid var(--accent-color)',
        boxShadow: '0 20px 40px rgba(33, 60, 81, 0.3)'
      }}>
        <Modal.Header 
          closeButton 
          style={{ 
            backgroundColor: 'transparent',
            color: 'var(--white)',
            borderBottom: '2px solid rgba(221, 174, 211, 0.3)',
            padding: '1.5rem 2rem 1rem 2rem'
          }}
        >
          <Modal.Title style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ 
              fontSize: '2rem',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}>
              ✨
            </span>
            {title}
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body style={{ 
          backgroundColor: 'var(--white)',
          color: 'var(--text-dark)',
          padding: '2rem',
          textAlign: 'center',
          position: 'relative'
        }}>
          {/* Decorative background pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 20%, rgba(221, 174, 211, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(101, 148, 177, 0.1) 0%, transparent 50%)
            `,
            pointerEvents: 'none'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 4px 8px rgba(33, 60, 81, 0.2))'
            }}>
              🎉
            </div>
            <p style={{ 
              margin: 0, 
              fontSize: '1.2rem', 
              lineHeight: '1.6',
              fontWeight: '500',
              color: 'var(--primary-color)'
            }}>
              {message}
            </p>
          </div>
        </Modal.Body>
        
        <Modal.Footer style={{ 
          backgroundColor: 'rgba(238, 238, 238, 0.8)',
          borderTop: '1px solid rgba(221, 174, 211, 0.3)',
          padding: '1.5rem 2rem',
          justifyContent: 'center'
        }}>
          <Button 
            onClick={onConfirm}
            style={{
              background: 'linear-gradient(135deg, var(--accent-color) 0%, #d19bc7 100%)',
              border: 'none',
              color: 'var(--primary-color)',
              fontWeight: '700',
              padding: '0.75rem 3rem',
              borderRadius: '25px',
              fontSize: '1.1rem',
              boxShadow: '0 4px 15px rgba(221, 174, 211, 0.4)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(221, 174, 211, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(221, 174, 211, 0.4)';
            }}
          >
            Awesome! 🚀
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default ConfirmModal;