let network, nodes, edges, allNodes, allEdges;
    let allNodesList = [];
    let isFullscreen = false;
    let currentUrl = '';
    let isDarkTheme = false;
    let activeFilterType = 'none';


    function initGraph() {
        const container = document.getElementById('networkCanvas');
        // Nodes and Edges
        nodes = new vis.DataSet([
            // Label nodes
            { id: 1, label: 'HR Tools', group: 'label', title: 'Category: HR Tools', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/HR-Tools' },
            { id: 2, label: 'HRIS', group: 'label', title: 'Category: HRIS', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/HRIS' },
            { id: 3, label: 'HR Analytics', group: 'label', title: 'Category: HR Analytics', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/HR-Analytics' },
            { id: 4, label: 'Laws', group: 'label', title: 'Category: Laws', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/Laws' },
            { id: 5, label: 'Career Guidance', group: 'label', title: 'Category: Career Guidance', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/Career-Guidance' },
            { id: 6, label: 'Interview', group: 'label', title: 'Category: Interview', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/Interview' },
            { id: 7, label: 'Case Studies', group: 'label', title: 'Category: Case Studies', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/Case-Studies' },
            { id: 8, label: 'Forms', group: 'label', title: 'Category: Forms', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/Forms' },
            { id: 9, label: 'Excel', group: 'label', title: 'Category: Excel', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/Excel' },
            { id: 10, label: 'PowerBI', group: 'label', title: 'Category: PowerBI', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/PowerBI' },
            { id: 11, label: 'AI in HR', group: 'label', title: 'Category: AI in HR', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/AI' },
            { id: 12, label: 'Google Sheets', group: 'label', title: 'Category: Google Sheets', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/Google-Sheets' },
            { id: 13, label: 'Data', group: 'label', title: 'Category: Data', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/Data' },
            { id: 14, label: 'Free Templates', group: 'label', title: 'Category: Free Templates', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/Free-Templates' },
            { id: 15, label: 'Fun Fest Ideas', group: 'label', title: 'Category: Fun Fest Ideas', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/Fun-Fest-Ideas' },
            { id: 16, label: 'Discussion', group: 'label', title: 'Category: Discussion', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/Discussion' },
            { id: 17, label: 'Others', group: 'label', title: 'Category: Others', type: 'label', url: 'https://vigneshwaranhr.blogspot.com/search/label/Others' },
            // Blog posts
            { id: 101, label: "Forms HR Should Know", group: 'post', title: 'Click to read post', type: 'post', parentLabel: 8, url: 'https://vigneshwaranhr.blogspot.com/2025/10/forms-hr-should-know.html' },
            { id: 102, label: "Perplexity Comet Browser", group: 'post', title: 'Click to read post', type: 'post', parentLabel: 11, url: 'https://vigneshwaranhr.blogspot.com/2025/09/exploring-perplexitys-new-beta-browser.html' },
            { id: 103, label: "AI Mail Automation", group: 'post', title: 'Click to read post', type: 'post', parentLabel: 11, url: 'https://vigneshwaranhr.blogspot.com/2025/09/how-im-using-free-ai-mail-automation-to.html' },
            { id: 104, label: "Attendance Tracker 2025", group: 'post', title: 'Click to read post', type: 'post', parentLabel: 9, url: 'https://vigneshwaranhr.blogspot.com/2025/08/attendance-tracker-template-2025-free.html' }
        ]);
        edges = new vis.DataSet([
            { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }, { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 8 },
            { from: 9, to: 10 }, { from: 10, to: 11 }, { from: 11, to: 12 }, { from: 12, to: 13 },
            { from: 14, to: 15 }, { from: 15, to: 16 }, { from: 16, to: 17 },
            { from: 8, to: 101 }, { from: 11, to: 102 }, { from: 11, to: 103 }, { from: 9, to: 104 }
        ]);
        allNodes = nodes.get({ returnType: 'Object' });
        allEdges = edges.get({ returnType: 'Array' });
        allNodesList = Object.values(allNodes).map(node => ({
            id: node.id, label: node.label, type: node.type, parentLabel: node.parentLabel
        }));
        const data = { nodes: nodes, edges: edges };
        const options = {
            nodes: {
                shape: 'dot',
                font: { 
                    size: 14, 
                    color: '#ffffff',
                    face: 'MS Sans Serif, Arial',
                    bold: true
                },
                borderWidth: 2,
                shadow: true
            },
            edges: {
                width: 2,
                color: { color: '#808080', highlight: '#000080' },
                smooth: { type: 'continuous' }
            },
            groups: {
                label: {
                    size: 35,
                    color: { 
                        background: '#800080', 
                        border: '#000000',
                        highlight: {
                            background: '#9932cc',
                            border: '#000000'
                        }
                    },
                    font: {
                        color: '#ffffff',
                        size: 14,
                        bold: true
                    }
                },
                post: {
                    size: 22,
                    shape: 'box',
                    color: { 
                        background: '#F5FFFA', 
                        border: '#000000',
                        highlight: {
                            background: '#e0ffff',
                            border: '#000080'
                        }
                    },
                    font: {
                        color: '#000000',
                        size: 12
                    }
                }
            },
            physics: {
                stabilization: { iterations: 200 },
                barnesHut: { gravitationalConstant: -10000, springLength: 180, springConstant: 0.04 }
            },
            interaction: {
                hover: true, 
                tooltipDelay: 100, 
                navigationButtons: false, 
                keyboard: true
            }
        };
        network = new vis.Network(container, data, options);
        
        // Update graph colors based on theme
        updateGraphColors();
        
        network.on("click", function(params) {
            if (params.nodes.length > 0) {
                const nodeId = params.nodes[0];
                const node = allNodes[nodeId];
                if (node && node.url) openModal(node.url, node.label);
            }
        });
        updateNodeCount();
        loadThemePreference();
    }
    
    // Update graph node colors based on theme
    function updateGraphColors() {
        const isDark = document.body.classList.contains('dark-theme');
        
        const labelColor = isDark ? '#9333ea' : '#800080';
        const labelHighlight = isDark ? '#a855f7' : '#9932cc';
        const postBgColor = isDark ? '#374151' : '#F5FFFA';
        const postHighlight = isDark ? '#4b5563' : '#e0ffff';
        const labelTextColor =  isDark ? '#ffffff' : '#000000';
        const postTextColor = isDark ? '#e8e8e8' : '#000000';
        const borderColor = isDark ? '#1a1a1a' : '#000000';
        const edgeColor = isDark ? '#4b5563' : '#808080';
        const edgeHighlight = isDark ? '#60a5fa' : '#000080';
        
        // Get currently visible nodes
        const visibleNodeIds = nodes.getIds();
        
        // Update all label nodes
        const labelNodes = Object.values(allNodes).filter(n => n.type === 'label' && visibleNodeIds.includes(n.id));
        labelNodes.forEach(node => {
            nodes.update({
                id: node.id,
                color: { 
                    background: labelColor, 
                    border: borderColor,
                    highlight: {
                        background: labelHighlight,
                        border: borderColor
                    }
                },
                font: { 
                    color: labelTextColor,
                    size: 14,
                    bold: true
                }
            });
        });
        
        // Update all post nodes
        const postNodes = Object.values(allNodes).filter(n => n.type === 'post' && visibleNodeIds.includes(n.id));
        postNodes.forEach(node => {
            nodes.update({
                id: node.id,
                color: { 
                    background: postBgColor, 
                    border: borderColor,
                    highlight: {
                        background: postHighlight,
                        border: isDark ? '#3b82f6' : '#000080'
                    }
                },
                font: { 
                    color: postTextColor,
                    size: 12
                }
            });
        });
        
        // Update edge colors
        network.setOptions({
            edges: {
                color: { color: edgeColor, highlight: edgeHighlight }
            }
        });
    }
    
    // Theme Toggle
    function toggleTheme() {
        isDarkTheme = !isDarkTheme;
        const body = document.body;
        const icon = document.getElementById('themeIcon');
        const label = document.getElementById('themeLabel');
        if (isDarkTheme) {
            body.classList.add('dark-theme');
            icon.textContent = "🌙";
            label.textContent = "Dark Theme";
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            icon.textContent = "☀️";
            label.textContent = "Light Theme";
            localStorage.setItem('theme', 'light');
        }
        updateGraphColors();
    }
    
    function loadThemePreference() {
        const savedTheme = localStorage.getItem('theme');
        const icon = document.getElementById('themeIcon');
        const label = document.getElementById('themeLabel');
        if (savedTheme === 'dark') {
            isDarkTheme = true;
            document.body.classList.add('dark-theme');
            icon.textContent = "🌙";
            label.textContent = "Dark Theme";
            updateGraphColors();
        }
    }
    
    // Modal Functions
    function openModal(url, title) {
        currentUrl = url;
        document.getElementById('modalTitle').textContent = title || 'Internet Explorer';
        document.getElementById('modalIframe').src = url;
        document.getElementById('modalUrlInput').value = url;
        document.getElementById('modalStatusText').textContent = 'Loading: ' + url;
        document.getElementById('modalOverlay').classList.add('active');
        document.getElementById('modalIframe').onload = function() {
            document.getElementById('modalStatusText').textContent = 'Done';
        };
    }
    
    function closeModal() {
        document.getElementById('modalOverlay').classList.remove('active');
        document.getElementById('modalIframe').src = '';
        document.getElementById('modalUrlInput').value = '';
        document.getElementById('modalWindow').classList.remove('fullscreen');
        isFullscreen = false;
    }
    
    function minimizeModal() { closeModal(); }
    
    function toggleFullscreen() {
        const modalWindow = document.getElementById('modalWindow');
        isFullscreen = !isFullscreen;
        if (isFullscreen) modalWindow.classList.add('fullscreen');
        else modalWindow.classList.remove('fullscreen');
    }
    
    function goBack() {
        const iframe = document.getElementById('modalIframe');
        try { iframe.contentWindow.history.back(); }
        catch (e) { }
    }
    
    function goToUrl() {
        const urlInput = document.getElementById('modalUrlInput');
        const url = urlInput.value.trim();
        if (url) {
            currentUrl = url;
            document.getElementById('modalIframe').src = url;
            document.getElementById('modalStatusText').textContent = 'Loading: ' + url;
        }
    }
    
    document.getElementById('modalUrlInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') goToUrl();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
    
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    
    function updateNodeCount() {
        const total = Object.keys(allNodes).length;
        const visible = nodes.get().length;
        const postCount = Object.values(allNodes).filter(n => n.type === 'post').length;
        document.getElementById('totalNodes').textContent = total;
        document.getElementById('visibleNodes').textContent = visible;
        document.getElementById('totalPosts').textContent = postCount;
    }
    
    // Improved Autocomplete with Categories
    const searchBox = document.getElementById('searchBox');
    const suggestionsBox = document.getElementById('autocompleteSuggestions');
    
    searchBox.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        // Reset label filter when search is being used
        if (searchTerm && activeFilterType !== 'search') {
            document.getElementById('labelFilter').value = 'all';
            activeFilterType = 'search';
        }
        
        if (!searchTerm) {
            suggestionsBox.style.display = 'none';
            if (activeFilterType === 'search') {
                resetToAllNodes();
                activeFilterType = 'none';
            }
            return;
        }
        
        const labelMatches = allNodesList.filter(node =>
            node.type === 'label' && node.label.toLowerCase().includes(searchTerm)
        );
        
        const postMatches = allNodesList.filter(node =>
            node.type === 'post' && node.label.toLowerCase().includes(searchTerm)
        );
        
        const hasMatches = labelMatches.length > 0 || postMatches.length > 0;
        
        if (hasMatches) {
            suggestionsBox.innerHTML = '';
            
            // Add Category Labels section
            if (labelMatches.length > 0) {
                const categoryHeader = document.createElement('div');
                categoryHeader.className = 'autocomplete-category';
                categoryHeader.textContent = `Category Labels (${labelMatches.length})`;
                suggestionsBox.appendChild(categoryHeader);
                
                labelMatches.forEach(match => {
                    const item = document.createElement('div');
                    item.className = 'autocomplete-item label-item';
                    item.textContent = match.label;
                    item.addEventListener('click', () => {
                        searchBox.value = match.label;
                        suggestionsBox.style.display = 'none';
                        activeFilterType = 'search';
                        filterBySearch(match.label);
                    });
                    suggestionsBox.appendChild(item);
                });
            }
            
            // Add Blog Posts section
            if (postMatches.length > 0) {
                const postHeader = document.createElement('div');
                postHeader.className = 'autocomplete-category';
                postHeader.textContent = `Blog Posts (${postMatches.length})`;
                suggestionsBox.appendChild(postHeader);
                
                postMatches.forEach(match => {
                    const item = document.createElement('div');
                    item.className = 'autocomplete-item';
                    item.textContent = match.label;
                    item.addEventListener('click', () => {
                        searchBox.value = match.label;
                        suggestionsBox.style.display = 'none';
                        activeFilterType = 'search';
                        filterBySearch(match.label);
                    });
                    suggestionsBox.appendChild(item);
                });
            }
            
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.innerHTML = '<div class="no-results">No results found</div>';
            suggestionsBox.style.display = 'block';
        }
        
        // Apply search filter in real-time
        filterBySearch(searchTerm);
    });
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#searchBox') && !e.target.closest('#autocompleteSuggestions')) {
            suggestionsBox.style.display = 'none';
        }
    });
    
    function filterBySearch(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        if (!term) {
            resetToAllNodes();
            return;
        }
        
        const filtered = Object.values(allNodes).filter(node =>
            node.label.toLowerCase().includes(term) ||
            (node.title && node.title.toLowerCase().includes(term))
        );
        
        nodes.clear();
        nodes.add(filtered);
        
        const filteredIds = filtered.map(n => n.id);
        const relevantEdges = allEdges.filter(edge =>
            filteredIds.includes(edge.from) && filteredIds.includes(edge.to)
        );
        
        edges.clear();
        edges.add(relevantEdges);
        
        updateNodeCount();
        updateGraphColors();
        
        // Fit the view to show filtered nodes
        if (filtered.length > 0) {
            setTimeout(() => {
                network.fit({
                    animation: { duration: 300, easingFunction: 'easeInOutQuad' }
                });
            }, 100);
        }
    }
    
    // Label Filter
    document.getElementById('labelFilter').addEventListener('change', function(e) {
        const labelId = parseInt(e.target.value);
        
        // Clear search box when label filter is used
        if (e.target.value !== 'all') {
            searchBox.value = '';
            suggestionsBox.style.display = 'none';
            activeFilterType = 'label';
        } else {
            activeFilterType = 'none';
        }
        
        if (e.target.value === 'all') {
            resetToAllNodes();
        } else {
            filterByLabel(labelId);
        }
    });
    
    function filterByLabel(labelId) {
        const filtered = Object.values(allNodes).filter(node =>
            node.id === labelId || node.parentLabel === labelId
        );
        
        nodes.clear();
        nodes.add(filtered);
        
        const filteredIds = filtered.map(n => n.id);
        const relevantEdges = allEdges.filter(edge =>
            filteredIds.includes(edge.from) && filteredIds.includes(edge.to)
        );
        
        edges.clear();
        edges.add(relevantEdges);
        
        updateNodeCount();
        updateGraphColors();
        
        // Fit the view to show filtered nodes
        if (filtered.length > 0) {
            setTimeout(() => {
                network.fit({
                    animation: { duration: 300, easingFunction: 'easeInOutQuad' }
                });
            }, 100);
        }
    }
    
    function resetToAllNodes() {
        nodes.clear();
        nodes.add(Object.values(allNodes));
        edges.clear();
        edges.add(allEdges);
        updateNodeCount();
        updateGraphColors();
    }
    
    function zoomIn() {
        const scale = network.getScale();
        network.moveTo({
            scale: scale * 1.2,
            animation: { duration: 300, easingFunction: 'easeInOutQuad' }
        });
    }
    
    function zoomOut() {
        const scale = network.getScale();
        network.moveTo({
            scale: scale * 0.8,
            animation: { duration: 300, easingFunction: 'easeInOutQuad' }
        });
    }
    
    function resetView() {
        // Clear both filters
        searchBox.value = '';
        document.getElementById('labelFilter').value = 'all';
        suggestionsBox.style.display = 'none';
        activeFilterType = 'none';
        
        // Reset to show all nodes
        resetToAllNodes();
        
        // Fit view with animation
        network.fit({
            animation: { duration: 500, easingFunction: 'easeInOutQuad' }
        });
    }
    
    function exportGraph() {
        const canvas = document.querySelector('#networkCanvas canvas');
        if (canvas) {
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                const theme = isDarkTheme ? 'dark' : 'light';
                const timestamp = new Date().toISOString().slice(0, 10);
                link.download = `hr-knowledge-graph-${theme}-${timestamp}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            });
        }
    }
    
    // Initialize the graph on page load
    initGraph();