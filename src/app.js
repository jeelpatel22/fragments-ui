import { signIn, getUser } from './auth';
import { createFragment, getUserFragments as listFragments } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const createForm = document.getElementById('create-form');
  const typeInput = document.getElementById('type');
  const contentInput = document.getElementById('content');
  const fragmentsList = document.getElementById('fragments-list');
  const loadButton = document.getElementById('load-fragments');
  const signInBtn = document.getElementById('signin');

  signInBtn?.addEventListener('click', () => signIn());

  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const type = typeInput.value;
    const content = contentInput.value;

    if (!content.trim()) {
      alert('Please enter some content');
      return;
    }

    try {
      await createFragment(type, content);
      alert('Fragment created!');
      contentInput.value = '';
    } catch (err) {
      console.error('Failed to create fragment:', err);
      alert('Error creating fragment. Please sign in first.');
    }
  });

  loadButton.addEventListener('click', async () => {
    try {
      const result = await listFragments(1);
      const fragments = result?.data?.fragments || result?.fragments || [];
      fragmentsList.innerHTML = '';

      fragments.forEach((fragment) => {
        const li = document.createElement('li');
        li.textContent = `ID: ${fragment.id}, Type: ${fragment.type}, Created: ${fragment.created}`;
        fragmentsList.appendChild(li);
      });
    } catch (err) {
      console.error('Failed to load fragments:', err);
      alert('Error loading fragments. Please sign in first.');
    }
  });
});
