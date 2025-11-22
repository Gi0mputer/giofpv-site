            </p >
          </div >
        </section >

  {/* Right Column: Gear List (No Images) */ }
  < div className = "space-y-4" >
  {
    gear.map((item, index) => (
      <div
        key={item.title}
        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-white/10"
      >
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sunset-amber/10 text-sunset-amber group-hover:scale-110 transition-transform">
            <Zap size={16} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white group-hover:text-sunset-amber transition-colors">
              {item.title}
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    ))
  }
        </div >
      </div >
    </main >
  );
}
