// 模拟数据
const mockColleges = [
    {
        "schoolCode": "SCH1001",
        "schoolName": "北京大学",
        "majorCode": "MAJ101",
        "majorName": "计算机科学与技术",
        "majorNote": "实验班",
        "years": 4,
        "tuition": 5000,
        "subject": "physics",
        "batch": "batch1",
        "averageRank": 100,
        "rank2024": 95,
        "rank2023": 102,
        "rank2022": 103
    },
    {
        "schoolCode": "SCH1002",
        "schoolName": "清华大学",
        "majorCode": "MAJ102",
        "majorName": "软件工程",
        "majorNote": "",
        "years": 4,
        "tuition": 5500,
        "subject": "physics",
        "batch": "batch1",
        "averageRank": 150,
        "rank2024": 145,
        "rank2023": 152,
        "rank2022": 153
    },
    {
        "schoolCode": "SCH1003",
        "schoolName": "复旦大学",
        "majorCode": "MAJ103",
        "majorName": "电子信息工程",
        "majorNote": "卓越班",
        "years": 4,
        "tuition": 5200,
        "subject": "physics",
        "batch": "batch1",
        "averageRank": 300,
        "rank2024": 295,
        "rank2023": 302,
        "rank2022": 303
    },
    {
        "schoolCode": "SCH1004",
        "schoolName": "上海交通大学",
        "majorCode": "MAJ104",
        "majorName": "人工智能",
        "majorNote": "",
        "years": 4,
        "tuition": 6000,
        "subject": "physics",
        "batch": "batch1",
        "averageRank": 200,
        "rank2024": 195,
        "rank2023": 202,
        "rank2022": 203
    },
    {
        "schoolCode": "SCH1005",
        "schoolName": "浙江大学",
        "majorCode": "MAJ105",
        "majorName": "数据科学与大数据技术",
        "majorNote": "",
        "years": 4,
        "tuition": 5800,
        "subject": "physics",
        "batch": "batch1",
        "averageRank": 250,
        "rank2024": 245,
        "rank2023": 252,
        "rank2022": 253
    },
    {
        "schoolCode": "SCH1006",
        "schoolName": "南京大学",
        "majorCode": "MAJ106",
        "majorName": "金融学",
        "majorNote": "国际班",
        "years": 4,
        "tuition": 5200,
        "subject": "history",
        "batch": "batch1",
        "averageRank": 500,
        "rank2024": 495,
        "rank2023": 502,
        "rank2022": 503
    },
    {
        "schoolCode": "SCH1007",
        "schoolName": "武汉大学",
        "majorCode": "MAJ107",
        "majorName": "临床医学",
        "majorNote": "八年制",
        "years": 8,
        "tuition": 6500,
        "subject": "physics",
        "batch": "batch1",
        "averageRank": 600,
        "rank2024": 595,
        "rank2023": 602,
        "rank2022": 603
    },
    {
        "schoolCode": "SCH1008",
        "schoolName": "中山大学",
        "majorCode": "MAJ108",
        "majorName": "法学",
        "majorNote": "",
        "years": 4,
        "tuition": 5000,
        "subject": "history",
        "batch": "batch1",
        "averageRank": 800,
        "rank2024": 795,
        "rank2023": 802,
        "rank2022": 803
    },
    {
        "schoolCode": "SCH1009",
        "schoolName": "华中科技大学",
        "majorCode": "MAJ109",
        "majorName": "机械设计制造及其自动化",
        "majorNote": "",
        "years": 4,
        "tuition": 5200,
        "subject": "physics",
        "batch": "batch1",
        "averageRank": 1200,
        "rank2024": 1195,
        "rank2023": 1202,
        "rank2022": 1203
    },
    {
        "schoolCode": "SCH1010",
        "schoolName": "四川大学",
        "majorCode": "MAJ110",
        "majorName": "口腔医学",
        "majorNote": "五年制",
        "years": 5,
        "tuition": 6000,
        "subject": "physics",
        "batch": "batch1",
        "averageRank": 900,
        "rank2024": 895,
        "rank2023": 902,
        "rank2022": 903
    }
];

// 应用状态
let collegeData = mockColleges;
let currentRank = null;
let filteredColleges = [];
let wishlist = [];
let finalList = [];
let allMajors = [];
let selectedMajors = [];

// DOM元素
const scoreInput = document.getElementById('score');
const subjectSelect = document.getElementById('subject');
const batchSelect = document.getElementById('batch');
const queryBtn = document.getElementById('query-btn');
const rankResult = document.getElementById('rank-result');
const rangeUp = document.getElementById('range-up');
const rangeDown = document.getElementById('range-down');
const searchSchoolInput = document.getElementById('search-school');
const filterBtn = document.getElementById('filter-btn');
const resultTable = document.getElementById('result-table').querySelector('tbody');
const wishlistTable = document.getElementById('wishlist-table').querySelector('tbody');
const finalTable = document.getElementById('final-table').querySelector('tbody');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const clearWishlistBtn = document.getElementById('clear-wishlist-btn');
const exportBtn = document.getElementById('export-btn');
const adjustOrderBtn = document.getElementById('adjust-order-btn');
const wishlistCount = document.getElementById('wishlist-count');
const finalCount = document.getElementById('final-count');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    initMajorSelect();
    
    // 事件监听
    queryBtn.addEventListener('click', queryRank);
    filterBtn.addEventListener('click', filterColleges);
    clearWishlistBtn.addEventListener('click', clearWishlist);
    exportBtn.addEventListener('click', exportWishlist);
    adjustOrderBtn.addEventListener('click', adjustOrder);
    
    // 点击页面其他位置关闭下拉框
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-multiselect')) {
            closeDropdown();
        }
    });
    
    // 专业搜索框输入事件
    document.getElementById('major-search').addEventListener('input', filterMajors);
});

// 初始化专业下拉框
function initMajorSelect() {
    const optionsContainer = document.getElementById('major-options');
    
    // 收集所有不重复的专业名称
    const majors = new Set();
    collegeData.forEach(college => {
        majors.add(college.majorName);
    });
    
    allMajors = Array.from(majors).sort();
    
    // 填充下拉框选项
    allMajors.forEach(major => {
        const option = document.createElement('div');
        option.className = 'option-item';
        option.innerHTML = `
            <input type="checkbox" id="major-${major}" value="${major}">
            <label for="major-${major}">${major}</label>
        `;
        option.querySelector('input').addEventListener('change', updateSelectedMajors);
        optionsContainer.appendChild(option);
    });
}

// 切换下拉框显示/隐藏
function toggleDropdown() {
    const dropdown = document.getElementById('major-dropdown');
    dropdown.classList.toggle('show');
    
    // 展开时自动聚焦搜索框
    if (dropdown.classList.contains('show')) {
        document.getElementById('major-search').focus();
    }
}

// 关闭下拉框
function closeDropdown() {
    document.getElementById('major-dropdown').classList.remove('show');
}

// 筛选专业
function filterMajors() {
    const searchTerm = document.getElementById('major-search').value.toLowerCase();
    const options = document.querySelectorAll('.option-item');
    
    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            option.style.display = 'flex';
        } else {
            option.style.display = 'none';
        }
    });
}

// 更新已选专业
function updateSelectedMajors() {
    const checkboxes = document.querySelectorAll('#major-options input[type="checkbox"]:checked');
    selectedMajors = Array.from(checkboxes).map(cb => cb.value);
    
    // 更新显示文本
    const selectedText = document.querySelector('.selected-text');
    if (selectedMajors.length === 0) {
        selectedText.textContent = '请选择专业';
    } else if (selectedMajors.length === 1) {
        selectedText.textContent = selectedMajors[0];
    } else {
        selectedText.textContent = `已选 ${selectedMajors.length} 个专业`;
    }
}

// 查询排名
function queryRank() {
    const score = parseInt(scoreInput.value);
    if (isNaN(score) || score < 0 || score > 750) {
        alert('请输入有效的高考分数(0-750)');
        return;
    }
    
    // 模拟排名计算
    currentRank = Math.round(1000000 / (score + 100) * 10);
    rankResult.textContent = currentRank.toLocaleString();
}

// 筛选学校
function filterColleges() {
    if (!currentRank) {
        alert('请先查询您的排名');
        return;
    }
    
    const up = parseInt(rangeUp.value) || 0;
    const down = parseInt(rangeDown.value) || 0;
    const schoolKeyword = searchSchoolInput.value.trim().toLowerCase();
    const subject = subjectSelect.value;
    const batch = batchSelect.value;
    
    const minRank = Math.max(1, currentRank - up);
    const maxRank = currentRank + down;
    
    // 筛选数据
    filteredColleges = collegeData.filter(college => {
        // 必须满足排名范围和科目批次
        const rankMatch = college.averageRank >= minRank && college.averageRank <= maxRank;
        const subjectMatch = college.subject === subject;
        const batchMatch = college.batch === batch;
        
        // 学校名称筛选
        let schoolMatch = true;
        if (schoolKeyword) {
            schoolMatch = college.schoolName.toLowerCase().includes(schoolKeyword);
        }
        
        // 专业名称筛选
        let majorMatch = true;
        if (selectedMajors.length > 0) {
            majorMatch = selectedMajors.includes(college.majorName);
        }
        
        return rankMatch && subjectMatch && batchMatch && schoolMatch && majorMatch;
    });
    
    // 显示筛选结果
    renderResultTable(filteredColleges);
    
    // 切换到结果选项卡
    switchTab('tab1');
}

// 渲染筛选结果表格
function renderResultTable(data) {
    resultTable.innerHTML = '';
    
    if (data.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="8" style="text-align:center;">没有找到符合条件的学校</td>`;
        resultTable.appendChild(row);
        return;
    }
    
    // 添加结果统计
    const countRow = document.createElement('tr');
    countRow.innerHTML = `<td colspan="8" style="text-align:center;background:#f8f9fa;">
        共找到 ${data.length} 所符合条件的学校
    </td>`;
    resultTable.appendChild(countRow);
    
    data.forEach((college, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${college.schoolName}</td>
            <td>${college.majorName} ${college.majorNote || ''}</td>
            <td>${college.averageRank.toLocaleString()}</td>
            <td>${college.rank2024 ? college.rank2024.toLocaleString() : '--'}</td>
            <td>${college.rank2023 ? college.rank2023.toLocaleString() : '--'}</td>
            <td>${college.rank2022 ? college.rank2022.toLocaleString() : '--'}</td>
            <td>${college.years}年</td>
            <td>${college.tuition ? college.tuition + '元/年' : '--'}</td>
            <td>
                <button class="action-btn add-to-wishlist" data-index="${index}" 
                        ${isInWishlist(college) ? 'disabled class="added"' : ''}>
                    ${isInWishlist(college) ? '已加入' : '加入清单'}
                </button>
            </td>
        `;
        
        resultTable.appendChild(row);
    });
    
    // 添加事件监听器
    document.querySelectorAll('.add-to-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            addToWishlist(index);
        });
    });
}

// 添加到志愿清单
function addToWishlist(index) {
    if (wishlist.length >= 200) {
        alert('志愿清单已满(最多200条)');
        return;
    }
    
    const college = filteredColleges[index];
    
    // 检查是否已添加
    if (wishlist.some(item => item.schoolCode === college.schoolCode && item.majorCode === college.majorCode)) {
        alert('该专业已在志愿清单中');
        return;
    }
    
    wishlist.push(college);
    renderWishlistTable();
    updateCounter();
    
    // 更新按钮状态
    const addBtn = document.querySelector(`#result-table .add-to-wishlist[data-index="${index}"]`);
    if (addBtn) {
        addBtn.classList.add('added');
        addBtn.disabled = true;
        addBtn.textContent = '已加入';
    }
}

// 渲染志愿清单表格
function renderWishlistTable() {
    wishlistTable.innerHTML = '';
    
    wishlist.forEach((college, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${college.schoolName}</td>
            <td>${college.majorName}</td>
            <td>${college.averageRank.toLocaleString()}</td>
            <td>
                <button class="action-btn danger remove-from-wishlist" data-index="${index}">移除</button>
                <button class="action-btn add-to-final-from-wishlist" data-index="${index}" 
                        ${isInFinal(college) ? 'disabled class="added"' : ''}>
                    ${isInFinal(college) ? '已加入' : '加入志愿'}
                </button>
            </td>
        `;
        
        wishlistTable.appendChild(row);
    });
    
    // 添加事件监听器
    document.querySelectorAll('.remove-from-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeFromWishlist(index);
        });
    });
    
    document.querySelectorAll('.add-to-final-from-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            addToFinalFromWishlist(index);
        });
    });
}

// 从志愿清单添加到最终志愿
function addToFinalFromWishlist(index) {
    if (finalList.length >= 96) {
        alert('最终志愿已满(最多96条)');
        return;
    }
    
    const college = wishlist[index];
    
    // 检查是否已添加
    if (finalList.some(item => item.schoolCode === college.schoolCode && item.majorCode === college.majorCode)) {
        alert('该专业已在最终志愿中');
        return;
    }
    
    finalList.push(college);
    renderFinalTable();
    updateCounter();
    
    // 更新按钮状态
    const addBtn = document.querySelector(`#wishlist-table .add-to-final-from-wishlist[data-index="${index}"]`);
    if (addBtn) {
        addBtn.classList.add('added');
        addBtn.disabled = true;
        addBtn.textContent = '已加入';
    }
}

// 渲染最终志愿表格
function renderFinalTable() {
    finalTable.innerHTML = '';
    
    finalList.forEach((college, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${college.schoolName}</td>
            <td>${college.majorName}</td>
            <td>${college.averageRank.toLocaleString()}</td>
            <td>
                <button class="action-btn danger remove-from-final" data-index="${index}">移除</button>
                <button class="action-btn move-up" data-index="${index}">上移</button>
                <button class="action-btn move-down" data-index="${index}">下移</button>
            </td>
        `;
        
        finalTable.appendChild(row);
    });
    
    // 添加事件监听器
    document.querySelectorAll('.remove-from-final').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeFromFinal(index);
        });
    });
    
    document.querySelectorAll('.move-up').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            if (index > 0) {
                moveFinalItem(index, index - 1);
            }
        });
    });
    
    document.querySelectorAll('.move-down').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            if (index < finalList.length - 1) {
                moveFinalItem(index, index + 1);
            }
        });
    });
}

// 从志愿清单移除
function removeFromWishlist(index) {
    if (index >= 0 && index < wishlist.length) {
        const removedCollege = wishlist[index];
        wishlist.splice(index, 1);
        renderWishlistTable();
        updateCounter();
        
        // 安全更新表1中对应按钮状态
        updateTable1ButtonState(removedCollege);
    }
}

// 从最终志愿移除
function removeFromFinal(index) {
    if (index >= 0 && index < finalList.length) {
        const removedCollege = finalList[index];
        finalList.splice(index, 1);
        renderFinalTable();
        updateCounter();
        
        // 安全更新表2中对应按钮状态
        updateTable2ButtonState(removedCollege);
    }
}

function updateTable1ButtonState(college) {
    if (!college || !resultTable) return;
    
    const rows = resultTable.querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // 跳过表头行和统计行
        if (i === 0 || row.cells.length < 8) continue;
        
        const schoolCell = row.cells[0];
        const majorCell = row.cells[1];
        
        if (schoolCell && majorCell) {
            const schoolName = schoolCell.textContent.trim();
            const majorName = majorCell.textContent.split(' ')[0].trim();
            
            if (schoolName === college.schoolName && majorName === college.majorName) {
                const button = row.querySelector('.add-to-wishlist');
                if (button) {
                    button.classList.remove('added');
                    button.disabled = false;
                    button.textContent = '加入清单';
                }
                break;
            }
        }
    }
}

function updateTable2ButtonState(college) {
    if (!college || !wishlistTable) return;
    
    const rows = wishlistTable.querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.cells.length < 5) continue; // 跳过表头
        
        const schoolCell = row.cells[1];
        const majorCell = row.cells[2];
        
        if (schoolCell && majorCell) {
            const schoolName = schoolCell.textContent.trim();
            const majorName = majorCell.textContent.trim();
            
            // 严格匹配：学校名称 + 专业名称（或改用 schoolCode/majorCode）
            if (schoolName === college.schoolName && majorName === college.majorName) {
                const button = row.querySelector('.add-to-final-from-wishlist');
                if (button) {
                    button.disabled = finalList.some(item => 
                        item.schoolCode === college.schoolCode && 
                        item.majorCode === college.majorCode
                    );
                    button.textContent = button.disabled ? '已加入' : '加入志愿';
                    button.classList.toggle('added', button.disabled);
                }
                break;
            }
        }
    }
}

// 移动最终志愿项
function moveFinalItem(fromIndex, toIndex) {
    const item = finalList[fromIndex];
    finalList.splice(fromIndex, 1);
    finalList.splice(toIndex, 0, item);
    renderFinalTable();
}

// 清空志愿清单
function clearWishlist() {
    if (confirm('确定要清空志愿清单吗？')) {
        wishlist = [];
        renderWishlistTable();
        updateCounter();
    }
}

// 导出志愿表
function exportWishlist() {
    if (finalList.length === 0) {
        alert('没有可导出的志愿数据');
        return;
    }
    
    // 这里简单使用alert模拟导出功能
    alert('导出功能已触发，共导出' + finalList.length + '条志愿数据\n实际应用中这里会生成Excel文件');
}

// 调整顺序
function adjustOrder() {
    alert('调整顺序功能将在实际应用中实现');
}

// 更新计数器
function updateCounter() {
    wishlistCount.textContent = wishlist.length;
    finalCount.textContent = finalList.length;
}

// 检查是否在志愿清单中
function isInWishlist(college) {
    return wishlist.some(item => item.schoolCode === college.schoolCode && item.majorCode === college.majorCode);
}

// 检查是否在最终志愿中
function isInFinal(college) {
    return finalList.some(item => item.schoolCode === college.schoolCode && item.majorCode === college.majorCode);
}

// 设置选项卡
function setupTabs() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

// 切换选项卡
function switchTab(tabId) {
    // 更新活动选项卡
    tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
    
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === tabId) {
            pane.classList.add('active');
        }
    });
}