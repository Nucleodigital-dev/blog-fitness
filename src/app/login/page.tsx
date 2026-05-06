import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams;

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: '24px', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
      <h1 style={{ marginBottom: 24, fontSize: '1.5rem', textAlign: 'center' }}>Admin Login</h1>
      
      {error && (
        <div style={{ padding: '12px', background: '#fee2e2', color: '#991b1b', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 600 }}>Email</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)' }} 
          />
        </div>
        
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 8, fontSize: '0.9rem', fontWeight: 600 }}>Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)' }} 
          />
        </div>

        <button 
          formAction={login}
          className="btn btn-primary"
          style={{ width: '100%', padding: '12px', marginTop: 8 }}
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
