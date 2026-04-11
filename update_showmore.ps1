$content = Get-Content "index.html" -Raw

$content = $content -replace '<!-- ============================================== \r?\nLESS IMPORTANT PROJECTS \(Commented out for later review\) \r?\n==============================================\r?\n', ''
$content = $content -replace '\r?\n-->\r?\n            </div>', "`n            </div>"

$oldBtn1 = '            <!-- See More Button -->
            <div class="text-center mt-12">
                <a href="https://github.com/almuheetushihab?tab=repositories" target="_blank" class="inline-block px-8 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300">
                    See More on GitHub
                </a>
            </div>'

$oldBtn2 = $oldBtn1.Replace("`r`n", "`n")

$newBtn = '            <!-- See More Button -->
            <div class="text-center mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button id="show-more-portfolio-btn" class="inline-block px-8 py-3 bg-yellow-400 border-2 border-yellow-400 text-black font-semibold rounded-lg hover:bg-transparent hover:text-yellow-400 transition-all duration-300" style="display: none;">
                    Show More Projects
                </button>
                <a href="https://github.com/almuheetushihab?tab=repositories" target="_blank" class="inline-block px-8 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300">
                    See More on GitHub
                </a>
            </div>'

$content = $content.Replace($oldBtn1, $newBtn)
$content = $content.Replace($oldBtn2, $newBtn)

Set-Content "index.html" $content -Encoding UTF8
Write-Host "Updated index.html successfully!"
