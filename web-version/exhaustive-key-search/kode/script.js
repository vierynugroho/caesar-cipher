document.getElementById('copyButton').addEventListener('click', function() {
    const codeArea = document.getElementById('code');
    codeArea.select();
    document.execCommand('copy');
    
    const message = document.getElementById('message');
    message.classList.remove('hidden');
    
    setTimeout(() => {
        message.classList.add('hidden');
    }, 2000);
});
