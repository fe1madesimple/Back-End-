'use client'
import { motion, AnimatePresence } from 'framer-motion'

export default function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 500,
            background: '#141B2D', border: '1px solid #2D3D60',
            borderRadius: 10, padding: '12px 20px',
            fontSize: 14, color: '#F1F5F9',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
