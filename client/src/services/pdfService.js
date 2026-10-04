import { jsPDF } from 'jspdf';
import storage from './storage';

export const pdfService = {
  /**
   * Export comprehensive PDF itinerary document for TripMate (Requirement 28)
   */
  exportTripPDF(trip, packingItems = [], budgetStats = null) {
    try {
      const doc = new jsPDF();
      let y = 20;

      // Header Banner
      doc.setFillColor(2, 112, 195); // Deep Sky / Navy #0270c3
      doc.rect(0, 0, 210, 26, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('TripMate — Plan Smart. Travel Easy. Enjoy More.', 14, 14);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Personalized Travel Itinerary & Expense Plan', 14, 21);

      y = 36;

      // 1. Trip Summary Card
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      const countryStr = trip.country ? ` (${trip.country})` : '';
      doc.text(`Destination: ${trip.destinationName || trip.destinationId}${countryStr}`, 14, y);
      y += 6;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const currencyCode = trip.currency || 'INR';
      const daysCount = Number(trip.daysCount) > 0 ? Number(trip.daysCount) : (trip.days?.length || 1);
      const nightsCount = Math.max(0, daysCount - 1);
      const durationStr = `${daysCount} Day${daysCount > 1 ? 's' : ''} (${daysCount === 1 ? 'Same-Day Return' : `${nightsCount} Nights`})`;
      doc.text(`Dates: ${trip.startDate} to ${trip.endDate} • ${durationStr} | Travelers: ${trip.travelers || 1} | Budget: ${currencyCode} ${(trip.budget || 0).toLocaleString()}`, 14, y);
      y += 6;

      if (trip.foodPreference || trip.travelStyle) {
        doc.text(`Food Preference: ${trip.foodPreference || 'No Preference'} | Travel Style: ${trip.travelStyle || 'Balanced'}`, 14, y);
        y += 6;
      }

      if (trip.interests && trip.interests.length > 0) {
        doc.text(`Interests: ${trip.interests.join(', ')}`, 14, y);
        y += 8;
      }

      doc.setDrawColor(226, 232, 240);
      doc.line(14, y, 196, y);
      y += 10;

      // 2. Day-by-Day Itinerary
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(2, 112, 195);
      doc.text('Day-by-Day Itinerary', 14, y);
      y += 7;

      if (trip.days && trip.days.length > 0) {
        trip.days.forEach((day) => {
          if (y > 255) {
            doc.addPage();
            y = 20;
          }

          doc.setFillColor(241, 245, 249);
          doc.rect(14, y - 4, 182, 7, 'F');
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(51, 65, 85);
          doc.text(`Day ${day.dayNumber} — ${day.date}`, 16, y + 1);
          y += 9;

          if (day.activities && day.activities.length > 0) {
            day.activities.forEach((act) => {
              if (y > 265) {
                doc.addPage();
                y = 20;
              }

              doc.setFontSize(9);
              doc.setFont('helvetica', 'bold');
              doc.setTextColor(15, 23, 42);
              const timeOfDayTag = act.timeOfDay ? `[${act.timeOfDay} - ${act.time}]` : `[${act.time}]`;
              doc.text(`${timeOfDayTag} ${act.name}`, 18, y);

              doc.setFont('helvetica', 'normal');
              doc.setTextColor(100, 116, 139);
              const costText = act.cost > 0 ? `Cost: ${trip.currencySymbol || '₹'}${act.cost}` : 'Free Entry';
              doc.text(`${act.location || 'Local'} | ${costText}`, 140, y);
              y += 4;

              if (act.reason) {
                doc.setFontSize(8);
                doc.setFont('helvetica', 'italic');
                doc.setTextColor(100, 116, 139);
                doc.text(`Note: ${act.reason}`, 22, y);
                y += 5;
              }
            });
          }
          y += 3;
        });
      }

      // 3. Budget Summary
      if (y > 230) {
        doc.addPage();
        y = 20;
      }
      y += 6;
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(2, 112, 195);
      doc.text('Estimated Budget Breakdown', 14, y);
      y += 7;

      if (budgetStats?.totals) {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85);
        Object.entries(budgetStats.totals).forEach(([cat, val]) => {
          doc.text(`• ${cat}: ${trip.currencySymbol || '₹'}${val.toLocaleString()}`, 18, y);
          y += 5;
        });

        const subtotal = budgetStats.originalTotal || (budgetStats.subtotal + (budgetStats.totals?.Other || 0)) || budgetStats.total;
        doc.text(`• Subtotal: ${trip.currencySymbol || '₹'}${subtotal.toLocaleString()}`, 18, y);
        y += 5;

        if (budgetStats.discount > 0 || trip.coupon) {
          const discountVal = budgetStats.discount || trip.coupon?.discount || 0;
          const couponCode = trip.coupon?.code || 'COUPON';
          doc.setTextColor(16, 149, 106); // Emerald Green
          doc.setFont('helvetica', 'bold');
          doc.text(`• Coupon Applied (${couponCode}): -${trip.currencySymbol || '₹'}${discountVal.toLocaleString()}`, 18, y);
          y += 5;
          doc.setTextColor(51, 65, 85);
        }

        const finalTotal = budgetStats.finalAmount || budgetStats.total;
        doc.setFont('helvetica', 'bold');
        doc.text(`Final Amount: ${trip.currencySymbol || '₹'}${finalTotal.toLocaleString()} (Budget: ${trip.currencySymbol || '₹'}${trip.budget?.toLocaleString()})`, 18, y);
        y += 8;
      }

      // 4. Packing Checklist
      if (packingItems && packingItems.length > 0) {
        if (y > 230) {
          doc.addPage();
          y = 20;
        }
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(2, 112, 195);
        doc.text('Packing Essentials Checklist', 14, y);
        y += 7;

        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(71, 85, 105);
        packingItems.slice(0, 16).forEach((item) => {
          if (y > 280) {
            doc.addPage();
            y = 20;
          }
          const checkMark = item.checked ? '[X]' : '[ ]';
          doc.text(`${checkMark} (${item.group}) ${item.label}`, 18, y);
          y += 4.5;
        });
      }

      // Footer disclaimer
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text('Generated by TripMate AI Travel Planner. Demo recommendations are being used. Verify official travel requirements through official sources.', 14, 290);

      // Save PDF file
      const fileName = `TripMate-${(trip.destinationName || 'Trip').replace(/\s+/g, '_')}-${trip.startDate}.pdf`;
      doc.save(fileName);
      return true;
    } catch (err) {
      console.error('PDF export error:', err);
      return false;
    }
  }
};

export default pdfService;
