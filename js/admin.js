// js/admin.js
document.addEventListener('DOMContentLoaded', () => {
    // Simulated Business Data
    const stats = {
        totalRevenue: 450000, // KSh
        pendingCommissions: 120000,
        activeLeads: 84,
        verifiedProperties: 156
    };

    // Update Dashboard UI
    if(document.getElementById('stat-revenue')) {
        document.getElementById('stat-revenue').innerText = `KSh ${stats.totalRevenue.toLocaleString()}`;
        document.getElementById('stat-leads').innerText = stats.activeLeads;
    }

    // Lead Management Logic
    const leadData = [
        { name: "Brenda W.", property: "2BR Kilimani", status: "Viewing Scheduled", value: "KSh 3,500" },
        { name: "Kevin O.", property: "Studio Westlands", status: "Deposit Paid", value: "KSh 1,750" },
        { name: "Sarah M.", property: "3BR Lavington", status: "Inquiry", value: "KSh 6,000" }
    ];

    const leadTable = document.getElementById('lead-table-body');
    if(leadTable) {
        leadTable.innerHTML = leadData.map(lead => `
            <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding: 12px;">${lead.name}</td>
                <td style="padding: 12px;">${lead.property}</td>
                <td style="padding: 12px;"><span class="badge" style="background: var(--bg-2); color: var(--orange);">${lead.status}</span></td>
                <td style="padding: 12px; font-weight: 600;">${lead.value}</td>
            </tr>
        `).join('');
    }
});