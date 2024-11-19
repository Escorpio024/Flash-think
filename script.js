document.addEventListener('DOMContentLoaded', function() {
    const publishBtn = document.getElementById('publishBtn');
    const newIdeaText = document.getElementById('newIdeaText');
    const ideasContainer = document.getElementById('ideasContainer');
    const recentIdeasContainer = document.querySelector('.recent-ideas');

    // Cargar ideas existentes
    loadExistingIdeas();
    loadRecentIdeas();

    publishBtn.addEventListener('click', function() {
        const ideaText = newIdeaText.value.trim();
        if (ideaText) {
            const newIdea = createIdeaElement(ideaText);
            ideasContainer.insertBefore(newIdea, ideasContainer.firstChild);
            newIdeaText.value = '';
        }
    });

    function loadExistingIdeas() {
        const existingIdeas = [
            { id: 1, user: 'Jose Prueba', date: 'Agosto 22', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.', upvotes: 99, downvotes: 10 },
            { id: 2, user: 'Pepe Prueb', date: 'Agosto 15', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.', upvotes: 70, downvotes: 5 }
        ];

        existingIdeas.forEach(idea => {
            const ideaElement = createIdeaElement(idea.text, idea.user, idea.date, idea.upvotes, idea.downvotes, idea.id);
            ideasContainer.appendChild(ideaElement);
        });
    }

    function createIdeaElement(text, user = 'Usuario Actual', date = 'Ahora', upvotes = 0, downvotes = 0, id = Date.now()) {
        const ideaDiv = document.createElement('div');
        ideaDiv.className = 'idea-card';
        ideaDiv.dataset.id = id;
        ideaDiv.dataset.userVote = '0'; // 0 = sin voto, 1 = upvote, -1 = downvote
        ideaDiv.innerHTML = `
            <div class="idea-header">
                <img src="user.png" alt="User" class="avatar">
                <span class="font-semibold">${user}</span>
                <span class="text-gray-500 text-sm ml-2">${date}</span>
            </div>
            <p class="mb-4">${text}</p>
            <div class="idea-footer">
                <div class="votes">
                    <button class="upvote"><i class="fas fa-arrow-up"></i> <span class="upvote-count">${upvotes}</span></button>
                    <button class="downvote"><i class="fas fa-arrow-down"></i> <span class="downvote-count">${downvotes}</span></button>
                </div>
                <button class="comment" style="border-radius: 100px; border: none;"><i class="fas fa-comment"></i> </button>
            </div>
        `;

        const upvoteBtn = ideaDiv.querySelector('.upvote');
        const downvoteBtn = ideaDiv.querySelector('.downvote');
        const upvoteCount = ideaDiv.querySelector('.upvote-count');
        const downvoteCount = ideaDiv.querySelector('.downvote-count');

        upvoteBtn.addEventListener('click', () => handleVote(ideaDiv, 1, upvoteCount, downvoteCount));
        downvoteBtn.addEventListener('click', () => handleVote(ideaDiv, -1, upvoteCount, downvoteCount));

        return ideaDiv;
    }

    function handleVote(ideaDiv, voteValue, upvoteCountElement, downvoteCountElement) {
        const currentVote = parseInt(ideaDiv.dataset.userVote);
        let newVote = 0;

        if (currentVote === voteValue) {
            // Si el usuario hace clic en el mismo botón, quitamos el voto
            newVote = 0;
            voteValue === 1 ? decrementCount(upvoteCountElement) : decrementCount(downvoteCountElement);
        } else {
            // Si el usuario cambia su voto o vota por primera vez
            newVote = voteValue;
            if (currentVote !== 0) {
                // Si está cambiando su voto, quitamos el voto anterior
                currentVote === 1 ? decrementCount(upvoteCountElement) : decrementCount(downvoteCountElement);
            }
            voteValue === 1 ? incrementCount(upvoteCountElement) : incrementCount(downvoteCountElement);
        }

        ideaDiv.dataset.userVote = newVote.toString();
        updateVoteButtonStyles(ideaDiv);
    }

    function incrementCount(element) {
        element.textContent = parseInt(element.textContent) + 1;
    }

    function decrementCount(element) {
        element.textContent = parseInt(element.textContent) - 1;
    }

    function updateVoteButtonStyles(ideaDiv) {
        const upvoteBtn = ideaDiv.querySelector('.upvote');
        const downvoteBtn = ideaDiv.querySelector('.downvote');
        const userVote = parseInt(ideaDiv.dataset.userVote);

        upvoteBtn.classList.toggle('voted', userVote === 1);
        downvoteBtn.classList.toggle('voted', userVote === -1);
    }

    function loadRecentIdeas() {
        const recentIdeas = [
            { title: 'Idea 1', user: 'Ben Flores' },
            { title: 'Idea 2', user: 'Mary Chris' },
            { title: 'Idea 3', user: 'Jennie Ang' },
            { title: 'Idea 4', user: 'Leon Pokem' },
            { title: 'Idea 5', user: 'David Shuck' },
            { title: 'Idea 6', user: 'Kylie James' }
        ];

        recentIdeas.forEach(idea => {
            const ideaElement = createRecentIdeaElement(idea.title, idea.user);
            recentIdeasContainer.appendChild(ideaElement);
        });
    }

    function createRecentIdeaElement(title, user) {
        const ideaDiv = document.createElement('div');
        ideaDiv.className = 'recent-idea';
        ideaDiv.innerHTML = `
            <img src="user.png" alt="User" class="avatar">
            <div class="recent-idea-content">
                <h3>${title}</h3>
                <p>${user}</p>
            </div>
        `;
        return ideaDiv;
    }

    function updateRecentIdeas(newIdeaText) {
        const newIdea = createRecentIdeaElement('Nueva Idea', 'Usuario Actual');
        recentIdeasContainer.insertBefore(newIdea, recentIdeasContainer.children[1]);
        if (recentIdeasContainer.children.length > 7) { // +1 para el título h2
            recentIdeasContainer.removeChild(recentIdeasContainer.lastChild);
        }
    }

    
    
});
