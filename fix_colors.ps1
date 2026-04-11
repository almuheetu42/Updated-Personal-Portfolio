$content = Get-Content "index.html" -Raw

# 1. Hero Section
$content = $content -replace 'text-4xl md:text-6xl font-bold text-white', 'text-4xl md:text-6xl font-bold text-gray-900 dark:text-white'
$content = $content -replace 'font-light text-gray-300">Web & Mobile', 'font-light text-gray-700 dark:text-gray-300">Web & Mobile'
$content = $content -replace 'text-gray-400 text-sm md:text-base leading-relaxed', 'text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed'
$content = $content -replace 'text-white font-semibold">2\+ years', 'text-gray-900 dark:text-white font-semibold">2+ years'

# 2. About Section
$content = $content -replace 'text-white mb-6 serif-font">About', 'text-gray-900 dark:text-white mb-6 serif-font">About'
$content = $content -replace 'text-gray-300 leading-relaxed mb-6 text-justify', 'text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-justify'
$content = $content -replace 'text-white">Android</span>', 'text-gray-900 dark:text-white">Android</span>'
$content = $content -replace 'text-white">React Native</span>', 'text-gray-900 dark:text-white">React Native</span>'
$content = $content -replace 'text-white">Kotlin</span>', 'text-gray-900 dark:text-white">Kotlin</span>'
$content = $content -replace 'text-white">Jetpack Compose</span>', 'text-gray-900 dark:text-white">Jetpack Compose</span>'
$content = $content -replace 'text-white">full-stack web development</span>', 'text-gray-900 dark:text-white">full-stack web development</span>'
$content = $content -replace 'text-white">UI/UX</span>', 'text-gray-900 dark:text-white">UI/UX</span>'
$content = $content -replace 'text-white">API integration</span>', 'text-gray-900 dark:text-white">API integration</span>'
$content = $content -replace 'text-white">clean architecture</span>', 'text-gray-900 dark:text-white">clean architecture</span>'

# 3. My Skills Section
$content = $content -replace 'text-white drop-shadow-md">My Skills', 'text-gray-900 dark:text-white drop-shadow-md">My Skills'
$content = $content -replace 'text-sm text-gray-300">Tools & technologies', 'text-sm text-gray-700 dark:text-gray-300">Tools & technologies'
$content = $content -replace 'text-sm text-gray-300/80 mt-1', 'text-sm text-gray-700/80 dark:text-gray-300/80 mt-1'
$content = $content -replace 'text-gray-400 border border-gray-700 hover:border-\[\#f6c47e\] hover:text-white', 'text-gray-600 dark:text-gray-400 border border-gray-400 dark:border-gray-700 hover:border-[#f6c47e] hover:text-gray-900 dark:hover:text-white'
$content = $content -replace 'text-xs text-gray-400 mt-1', 'text-xs text-gray-600 dark:text-gray-400 mt-1'

# 4. Education Section
$content = $content -replace 'text-white border-b border-gray-600 py-8 text-right', 'text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 py-8 text-right'
$content = $content -replace 'text-white text-sm font-bold', 'text-gray-900 dark:text-white text-sm font-bold'
$content = $content -replace 'text-white group-hover:text-yellow-400', 'text-gray-900 dark:text-white group-hover:text-yellow-400'
$content = $content -replace 'text-lg text-gray-300 mt-1', 'text-lg text-gray-700 dark:text-gray-300 mt-1'
$content = $content -replace 'text-xs text-gray-400 italic', 'text-xs text-gray-600 dark:text-gray-400 italic'
$content = $content -replace 'text-gray-300 text-sm leading-relaxed serif-font', 'text-gray-700 dark:text-gray-300 text-sm leading-relaxed serif-font'

# 5. Online Courses Section
$content = $content -replace 'text-white mb-4">Online', 'text-gray-900 dark:text-white mb-4">Online'
$content = $content -replace 'text-white mb-2 group-hover:text-yellow-400', 'text-gray-900 dark:text-white mb-2 group-hover:text-yellow-400'
$content = $content -replace 'text-gray-400 text-sm">', 'text-gray-600 dark:text-gray-400 text-sm">'

# 6. Experience Section
$content = $content -replace 'text-white border-b border-gray-600 pb-4">[\s]*Experience', 'text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600 pb-4">`n                Experience'
$content = $content -replace 'text-gray-300 text-sm leading-relaxed mb-3', 'text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3'
$content = $content -replace 'text-gray-400 space-y-1', 'text-gray-600 dark:text-gray-400 space-y-1'

# 7. Additional Section
$content = $content -replace 'text-white mb-4 serif-font">Hobbies', 'text-gray-900 dark:text-white mb-4 serif-font">Hobbies'
$content = $content -replace 'text-white mb-4 serif-font">Languages', 'text-gray-900 dark:text-white mb-4 serif-font">Languages'
$content = $content -replace 'text-gray-300">Bengali', 'text-gray-700 dark:text-gray-300">Bengali'
$content = $content -replace 'text-gray-300">English', 'text-gray-700 dark:text-gray-300">English'
$content = $content -replace 'text-gray-300">Hindi', 'text-gray-700 dark:text-gray-300">Hindi'
$content = $content -replace 'bg-gray-700 text-gray-200', 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'

# 8. Contact & Footer (They use CSS variables mostly, but let's ensure Contact text is readable)
# Contact Section uses `text-white`? No, it uses CSS variables `--text-headings` and `--text-secondary`.
# Wait, are there any hardcoded text-gray-300 in contact section? No, from our grep it was mostly using CSS classes.

Set-Content "index.html" $content -Encoding UTF8
Write-Host "Replaced targeted Tailwind classes successfully!"
