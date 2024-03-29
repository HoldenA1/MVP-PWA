let deferredPrompt;
const installBanner = document.querySelector('.install-banner');
const installButton = document.querySelector('.install-button');
installBanner.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  installBanner.style.display = 'block';

  installButton.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    installBanner.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});

window.addEventListener('appinstalled', (event) => {
  console.log('MVP Viewer App was installed.', event);
});
