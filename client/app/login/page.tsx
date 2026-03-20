'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Eye, EyeOff, Shield, Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react'
import styles from './login.module.css'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter your email and password')
      return
    }

    setLoading(true)

    // Demo: accept admin@fe1madesimple.ie / admin123
    setTimeout(() => {
      setLoading(false)
      if (email === 'admin@fe1madesimple.ie' && password === 'admin123') {
        setSuccess(true)
        setTimeout(() => router.push('/dashboard'), 1200)
      } else {
        setError('Invalid credentials - please check your email and password')
      }
    }, 1600)
  }

  return (
    <div className={styles.page}>
      {/* Background grid effect */}
      <div className={styles.bgGrid} />

      {/* Glow blobs */}
      <div className={styles.glow1} />
      <div className={styles.glow2} />

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Logo */}
        <div className={styles.logoWrap}>
          <Image
            src='https://res.cloudinary.com/dkrjrfqpy/image/upload/v1773753081/Frame_23_1_thcowx.svg'
            alt='FE-1 Made Simple'
            width={120}
            height={34}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Heading */}
        <div className={styles.heading}>
          <div className={styles.shieldWrap}>
            <Shield size={20} color='var(--blue-bright)' />
          </div>
          <h1 className={styles.title}>Admin Portal</h1>
          <p className={styles.subtitle}>Sign in to access the FE-1 Made Simple admin dashboard</p>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleLogin}>

          {/* Email field */}
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrap}>
              <Mail size={15} className={styles.inputIcon} />
              <input
                type='email'
                className={styles.input}
                placeholder='admin@fe1madesimple.ie'
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                autoComplete='email'
                autoFocus
              />
            </div>
          </div>

          {/* Password field */}
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrap}>
              <Lock size={15} className={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                className={styles.input}
                placeholder='Enter your password'
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                autoComplete='current-password'
                style={{ paddingRight: 44 }}
              />
              <button
                type='button'
                className={styles.eyeBtn}
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                className={styles.errorBox}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <AlertCircle size={14} color='var(--red)' />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success */}
          <AnimatePresence>
            {success && (
              <motion.div
                className={styles.successBox}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle size={14} color='var(--green)' />
                Login successful - redirecting...
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            type='submit'
            className={styles.submitBtn}
            disabled={loading || success}
          >
            {loading ? (
              <span className={styles.loadingDots}>
                <span /><span /><span />
              </span>
            ) : success ? (
              <><CheckCircle size={16} /> Signed In</>
            ) : (
              'Sign In to Dashboard'
            )}
          </button>
        </form>

        {/* Demo hint */}
        <div className={styles.demoHint}>
          <span className={styles.demoLabel}>Demo credentials</span>
          <span className={styles.demoCred}>admin@fe1madesimple.ie</span>
          <span className={styles.demoSep}>.</span>
          <span className={styles.demoCred}>admin123</span>
        </div>

        <div className={styles.footer}>
          <Shield size={12} color='var(--text-muted)' />
          Secured admin access . FE-1 Made Simple
        </div>
      </motion.div>
    </div>
  )
}
