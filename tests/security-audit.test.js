/**
 * JOB WAY AI - Security & Compliance Automated Audit Suite
 * Audits Secrets Exclusion, Row-Level Security, API Protection, and Sanitization
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

describe('Security & Compliance Audit', () => {
  const rootDir = path.resolve(__dirname, '..');

  it('audits .env.example to ensure zero actual secrets or API keys are committed', () => {
    const envExamplePath = path.join(rootDir, '.env.example');
    assert.ok(fs.existsSync(envExamplePath), '.env.example must exist as a safe template');

    const content = fs.readFileSync(envExamplePath, 'utf8');

    // Check for real key patterns
    assert.doesNotMatch(content, /AIza[0-9A-Za-z-_]{35}/, 'Google API key must not be in .env.example');
    assert.doesNotMatch(content, /AQ\.[0-9A-Za-z-_]{40,}/, 'Real service key must not be in .env.example');
    assert.match(content, /GEMINI_API_KEY=your_gemini_api_key_here/, 'Placeholder key must be used');
  });

  it('audits .gitignore to verify critical security exclusions', () => {
    const gitignorePath = path.join(rootDir, '.gitignore');
    assert.ok(fs.existsSync(gitignorePath), '.gitignore must exist');

    const content = fs.readFileSync(gitignorePath, 'utf8');

    assert.ok(content.includes('.env'), '.gitignore must exclude .env files');
    assert.ok(content.includes('node_modules'), '.gitignore must exclude node_modules');
    assert.ok(content.includes('.venv') || content.includes('venv'), '.gitignore must exclude Python venvs');
  });

  it('audits database/schema.sql to verify Row-Level Security (RLS) policies', () => {
    const schemaPath = path.join(rootDir, 'database', 'schema.sql');
    assert.ok(fs.existsSync(schemaPath), 'database/schema.sql must exist');

    const content = fs.readFileSync(schemaPath, 'utf8');

    assert.ok(content.includes('ENABLE ROW LEVEL SECURITY'), 'RLS must be enabled in schema');
    assert.ok(content.includes('CREATE POLICY'), 'Security policies must be defined');
    assert.ok(content.includes('auth.uid()'), 'User isolation via auth.uid() must be enforced');
  });

  it('verifies that frontend source code contains no hardcoded backend API keys', () => {
    const frontendSrcDir = path.join(rootDir, 'frontend', 'src');
    
    function scanFiles(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanFiles(fullPath);
        } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
          const fileContent = fs.readFileSync(fullPath, 'utf8');
          assert.doesNotMatch(
            fileContent,
            /AIza[0-9A-Za-z-_]{35}/,
            `Hardcoded API key detected in ${entry.name}`
          );
        }
      }
    }

    scanFiles(frontendSrcDir);
  });
});
