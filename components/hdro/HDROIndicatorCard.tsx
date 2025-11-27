'use client';

import { useState } from 'react';
import { TrendDirection } from '@/types';
import { ArrowUp, ArrowDown, Minus, Info, Users } from 'lucide-react';
import InfoModal from '@/components/ui/InfoModal';

interface HDROIndicatorCardProps {
  title: string;
  value: string | number;
  year: number;
  trend?: TrendDirection;
  change?: string;
  rank?: string;
  hasGenderData?: boolean;
  description?: string;
  unit?: string;
  onClick?: () => void;
}

export default function HDROIndicatorCard({
  title,
  value,
  year,
  trend,
  change,
  rank,
  hasGenderData,
  description,
  unit,
  onClick,
}: HDROIndicatorCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const TrendIcon =
    trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;
  const trendColor =
    trend === 'up'
      ? 'text-data-green'
      : trend === 'down'
        ? 'text-data-red'
        : 'text-slate-light';

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <div
        className={`card group transition-all duration-200 ${onClick ? 'cursor-pointer hover:scale-[1.02] hover:shadow-lg' : ''
          }`}
        onClick={handleClick}
      >
        <div className="space-y-4">
          {/* Title with Badges */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium text-slate-light flex-1">{title}</h3>
            <div className="flex items-center gap-1">
              {hasGenderData && (
                <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs font-medium">
                  <Users className="w-3 h-3" />
                  <span>Gender</span>
                </div>
              )}
              {description && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                  className="p-1 hover:bg-slate/10 rounded transition-colors"
                  aria-label={`Learn more about ${title}`}
                >
                  <Info className="w-4 h-4 text-slate-light" />
                </button>
              )}
            </div>
          </div>

          {/* Value */}
          <div className="metric-value text-primary">{value}</div>

          {/* Year and Unit */}
          <div className="flex items-center justify-between text-xs text-slate-light">
            <span>Year: {year}</span>
            {unit && <span>{unit}</span>}
          </div>

          {/* Rank and Trend */}
          <div className="flex items-center justify-between">
            {rank && (
              <span className="rank-badge bg-primary/10 text-primary border-primary/20">
                Rank: {rank}
              </span>
            )}

            {trend && (
              <div className={`flex items-center gap-1 ${trendColor}`}>
                <TrendIcon className="h-4 w-4" aria-hidden="true" />
                {change && <span className="text-sm font-medium">{change}</span>}
              </div>
            )}
          </div>

          {/* View Details Link */}
          {onClick && (
            <div className="pt-2 border-t border-slate/10">
              <span className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1 transition-colors duration-200">
                View Details →
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Info Modal */}
      {description && (
        <InfoModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-primary mb-2">What is this?</h4>
              <p className="text-slate">{description}</p>
            </div>
            {unit && (
              <div>
                <h4 className="font-semibold text-primary mb-2">Unit of Measurement</h4>
                <p className="text-slate">{unit}</p>
              </div>
            )}
            <div>
              <h4 className="font-semibold text-primary mb-2">Data Source</h4>
              <p className="text-slate">UNDP Human Development Report Office (HDRO)</p>
              <a
                href="https://hdr.undp.org/data-center"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-data-cyan hover:text-data-blue underline mt-1 inline-block"
              >
                View source →
              </a>
            </div>
          </div>
        </InfoModal>
      )}
    </>
  );
}
