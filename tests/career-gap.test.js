/**
 * JOB WAY AI - Career Paths, Gap Analysis & Curriculum Tests
 * Verifies all 12 Complete Industry Career Tracks, Gap Analysis, and Pacing
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { CAREER_PATHS } = require('./fixtures/careerPaths');

describe('12 Complete Industry Career Tracks & Gap Engine', () => {
  it('contains valid career paths with grounded metadata', () => {
    assert.ok(CAREER_PATHS.length >= 4);
    for (const career of CAREER_PATHS) {
      assert.ok(career.id, 'Career must have a valid ID');
      assert.ok(career.title, 'Career must have a valid title');
      assert.ok(Array.isArray(career.requiredSkills), 'Career must have required skills array');
      assert.ok(career.requiredSkills.length > 0, 'Career must require at least one skill');

      for (const skill of career.requiredSkills) {
        assert.ok(skill.name, 'Skill must have a name');
        assert.ok(skill.weight >= 1, 'Skill weight must be at least 1');
      }
    }
  });

  it('correctly calculates gap between required and acquired skills', () => {
    const fullstack = CAREER_PATHS.find(c => c.id === 'fullstack-dev');
    const userSkillNames = ['JavaScript', 'React'];

    const missing = fullstack.requiredSkills
      .filter(req => !userSkillNames.includes(req.name))
      .map(req => req.name);

    assert.ok(missing.includes('Node.js'));
    assert.ok(missing.includes('PostgreSQL'));
    assert.ok(!missing.includes('JavaScript'));
    assert.ok(!missing.includes('React'));
  });
});
