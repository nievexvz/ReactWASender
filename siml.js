document.addEventListener('DOMContentLoaded', function() {
  const channelUrl = document.getElementById('channelUrl');
  const emojiInput = document.getElementById('emojiInput');
  const sendButton = document.getElementById('sendButton');
  const result = document.getElementById('result');
  const loading = document.getElementById('loading');
  const emptyState = document.getElementById('emptyState');
  
  channelUrl.value = 'https://whatsapp.com/channel/0029Va/...';
  emojiInput.value = '🗿,😂,🤣,🤭,😹,😎';
  
  sendButton.addEventListener('click', sendReaction);
  
  emojiInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendReaction();
    }
  });
  
  async function sendReaction() {
    const url = channelUrl.value.trim();
    const emojis = emojiInput.value.trim();
    
    if (!url) {
      alert('Please enter channel URL');
      return;
    }
    
    if (!emojis) {
      alert('Please enter emojis');
      return;
    }
    
    loading.classList.remove('hidden');
    result.classList.add('hidden');
    emptyState.classList.add('hidden');
    sendButton.disabled = true;
    
    const encodedUrl = encodeURIComponent(url);
    const encodedEmojis = encodeURIComponent(emojis);
    
    const apiUrl = `https://api.fikmydomainsz.xyz/tools/reactchannel?link=${encodedUrl}&emojis=${encodedEmojis}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      loading.classList.add('hidden');
      sendButton.disabled = false;
      
      document.getElementById('resultUrl').textContent = url;
      document.getElementById('resultEmojis').textContent = emojis;
      
      if (response.ok) {
        document.getElementById('resultStatus').textContent = 'Success ✓';
        document.getElementById('resultStatus').className = 'text-sm font-medium text-green-600';
      } else {
        document.getElementById('resultStatus').textContent = 'Failed ✗';
        document.getElementById('resultStatus').className = 'text-sm font-medium text-red-600';
      }
      
      result.classList.remove('hidden');
      
    } catch (error) {
      loading.classList.add('hidden');
      sendButton.disabled = false;
      
      document.getElementById('resultUrl').textContent = url;
      document.getElementById('resultEmojis').textContent = emojis;
      document.getElementById('resultStatus').textContent = 'Network Error ✗';
      document.getElementById('resultStatus').className = 'text-sm font-medium text-red-600';
      
      result.classList.remove('hidden');
    }
  }
});
