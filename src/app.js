import { signIn, getUser } from './auth';
import { getUserFragments } from './api';

import { createFragment, getUserFragments } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const createForm = document.getElementById('create-form');
  const typeInput = document.getElementById('type');
  const contentInput = document.getElementById('content');
  const fragmentsList = document.getElementById('fragments-list');
  const loadButton = document.getElementById('load-fragments');

  createForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const type = typeInput.value;
    const content = contentInput.value;

    if (!content.trim()) {
      alert('Please enter some content');
      return;
    }

    try {
      const response = await createFragment(type, content);
      alert('Fragment created!');
      contentInput.value = '';
    } catch (err) {
      console.error('Failed to create fragment:', err);
      alert('Error creating fragment.');
    }
  });

  loadButton.addEventListener('click', async () => {
    try {
      const fragments = await getUserFragments();
      fragmentsList.innerHTML = '';

      fragments.forEach((fragment) => {
        const li = document.createElement('li');
        li.textContent = `ID: ${fragment.id}, Type: ${fragment.type}, Created: ${fragment.created}`;
        fragmentsList.appendChild(li);
      });
    } catch (err) {
      console.error('Failed to load fragments:', err);
      alert('Error loading fragments.');
    }
  });
});
