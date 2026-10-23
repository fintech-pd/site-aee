'use client'

import { useState, type FormEvent } from 'react'

export function ContactForm({ institutionId }: { institutionId: number }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const form = event.currentTarget
    const data = new FormData(form)

    const payload = {
      institutionId,
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      subject: data.get('subject'),
      message: data.get('message'),
      consent: data.get('consent') === 'on',
      website: data.get('website'),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()

      if (!res.ok) {
        setErrorMessage(json.error || 'Não foi possível enviar sua mensagem.')
        setStatus('error')
        return
      }

      setStatus('success')
      form.reset()
    } catch {
      setErrorMessage('Falha de conexão. Tente novamente em alguns instantes.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form__message form__message--success">
        Mensagem enviada com sucesso! Em breve nossa equipe entrará em contato.
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* Campo-armadilha anti-spam: invisível para pessoas, preenchido apenas por bots. */}
      <div className="honeypot-field" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form__row">
        <div className="form__field">
          <label className="form__label" htmlFor="name">Nome *</label>
          <input className="form__input" id="name" name="name" type="text" required />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="email">E-mail *</label>
          <input className="form__input" id="email" name="email" type="email" required />
        </div>
      </div>

      <div className="form__row">
        <div className="form__field">
          <label className="form__label" htmlFor="phone">Telefone</label>
          <input className="form__input" id="phone" name="phone" type="tel" />
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="subject">Assunto</label>
          <input className="form__input" id="subject" name="subject" type="text" />
        </div>
      </div>

      <div className="form__field">
        <label className="form__label" htmlFor="message">Mensagem *</label>
        <textarea className="form__textarea" id="message" name="message" rows={5} required />
      </div>

      <label className="form__checkbox-row">
        <input type="checkbox" name="consent" required />
        <span>
          Autorizo o tratamento dos meus dados pessoais para fins de contato, conforme a Lei
          Geral de Proteção de Dados (LGPD). *
        </span>
      </label>

      {status === 'error' && (
        <div className="form__message form__message--error">{errorMessage}</div>
      )}

      <button className="button form__submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
      </button>
    </form>
  )
}
